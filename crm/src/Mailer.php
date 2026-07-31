<?php

declare(strict_types=1);

namespace App;

use RuntimeException;

/**
 * Minimal, dependency-free SMTP client - enough to deliver lead
 * notifications and weekly reports through a configured mail server
 * (host/port/credentials), keeping MicroCRM's "copy files, no services"
 * deployment story intact.
 *
 * Supports implicit TLS (secure=ssl, usually port 465), STARTTLS
 * (secure=tls, usually port 587), and unencrypted (secure='', port 25).
 * Authentication is AUTH LOGIN when a username is supplied.
 */
class Mailer
{
    /**
     * @param array $cfg host, port, secure ('', 'ssl', 'tls'), username,
     *                    password, from_email, from_name
     * @throws RuntimeException on any protocol/connection failure
     */
    public static function send(array $cfg, string $toEmail, string $subject, string $htmlBody): void
    {
        $host = (string) ($cfg['host'] ?? '');
        $port = (int) ($cfg['port'] ?? 587);
        $secure = (string) ($cfg['secure'] ?? 'tls');
        $username = (string) ($cfg['username'] ?? '');
        $password = (string) ($cfg['password'] ?? '');
        $fromEmail = (string) ($cfg['from_email'] ?? $username);
        $fromName = (string) ($cfg['from_name'] ?? 'MicroCRM');

        // to / cc / bcc each may be a comma-separated list.
        $recipients = self::splitRecipients($toEmail);
        $cc = self::splitRecipients((string) ($cfg['cc'] ?? ''));
        $bcc = self::splitRecipients((string) ($cfg['bcc'] ?? ''));

        if ($host === '' || $fromEmail === '' || $recipients === []) {
            throw new RuntimeException('SMTP config incomplete (host/from/to required).');
        }

        // Envelope = everyone who receives it (bcc included, deduped).
        $envelope = array_values(array_unique(array_merge($recipients, $cc, $bcc)));

        $transport = $secure === 'ssl' ? "ssl://{$host}" : $host;
        $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
        $conn = @stream_socket_client(
            "{$transport}:{$port}",
            $errno,
            $errstr,
            15,
            STREAM_CLIENT_CONNECT,
            $ctx
        );
        if (!$conn) {
            throw new RuntimeException("Connect failed: {$errstr} ({$errno})");
        }
        stream_set_timeout($conn, 15);

        try {
            self::expect($conn, 220);

            $ehloHost = self::ehloName();
            self::cmd($conn, "EHLO {$ehloHost}", 250);

            if ($secure === 'tls') {
                self::cmd($conn, 'STARTTLS', 220);
                if (!@stream_socket_enable_crypto($conn, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                    throw new RuntimeException('STARTTLS negotiation failed.');
                }
                self::cmd($conn, "EHLO {$ehloHost}", 250);
            }

            if ($username !== '') {
                self::cmd($conn, 'AUTH LOGIN', 334);
                self::cmd($conn, base64_encode($username), 334);
                self::cmd($conn, base64_encode($password), 235);
            }

            self::cmd($conn, "MAIL FROM:<{$fromEmail}>", 250);
            foreach ($envelope as $rcpt) {
                self::cmd($conn, "RCPT TO:<{$rcpt}>", [250, 251]);
            }
            self::cmd($conn, 'DATA', 354);

            // Cc is shown in headers; Bcc is intentionally omitted.
            $headers = self::buildHeaders($fromEmail, $fromName, $recipients, $cc, $subject);
            $body = $headers . "\r\n" . self::dotStuff($htmlBody) . "\r\n.";
            self::cmd($conn, $body, 250);

            self::cmd($conn, 'QUIT', [221], false);
        } finally {
            @fclose($conn);
        }
    }

    /** Splits a comma-separated recipient string into a clean list. */
    private static function splitRecipients(string $raw): array
    {
        return array_values(array_filter(
            array_map('trim', explode(',', $raw)),
            fn($e) => $e !== ''
        ));
    }

    private static function buildHeaders(string $fromEmail, string $fromName, array $recipients, array $cc, string $subject): string
    {
        $encodedName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $toHeader = implode(', ', array_map(fn($e) => "<{$e}>", $recipients));
        $lines = [
            "Date: " . date('r'),
            "From: {$encodedName} <{$fromEmail}>",
            "To: {$toHeader}",
        ];
        if ($cc !== []) {
            $lines[] = 'Cc: ' . implode(', ', array_map(fn($e) => "<{$e}>", $cc));
        }
        $lines = array_merge($lines, [
            "Subject: {$encodedSubject}",
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=UTF-8",
            "Content-Transfer-Encoding: 8bit",
            "Message-ID: <" . bin2hex(random_bytes(12)) . "@microcrm>",
        ]);
        return implode("\r\n", $lines) . "\r\n";
    }

    /** SMTP requires a leading dot on a line to be doubled. */
    private static function dotStuff(string $body): string
    {
        $body = preg_replace("/\r\n|\r|\n/", "\r\n", $body);
        return preg_replace('/^\./m', '..', $body);
    }

    private static function ehloName(): string
    {
        $host = $_SERVER['SERVER_NAME'] ?? (gethostname() ?: 'localhost');
        return preg_match('/^[a-z0-9.\-]+$/i', $host) ? $host : 'localhost';
    }

    private static function cmd($conn, string $line, $expected, bool $read = true): void
    {
        fwrite($conn, $line . "\r\n");
        if ($read) {
            self::expect($conn, $expected);
        }
    }

    /** @param int|int[] $expected */
    private static function expect($conn, $expected): void
    {
        $expected = (array) $expected;
        $response = '';
        // Read the (possibly multi-line) reply; continuation lines have a
        // hyphen after the code, the final line a space.
        while (($line = fgets($conn, 515)) !== false) {
            $response .= $line;
            if (strlen($line) >= 4 && $line[3] === ' ') {
                break;
            }
        }
        $code = (int) substr(ltrim($response), 0, 3);
        if (!in_array($code, $expected, true)) {
            throw new RuntimeException('SMTP error: ' . trim($response));
        }
    }
}
