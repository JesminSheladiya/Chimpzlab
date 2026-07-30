<?php
// Direct lead capture — no FlightPHP, no .htaccess needed

// Honeypot check
if (!empty($_POST['_hp'])) {
    header('Location: ' . ($_POST['_redirect'] ?? 'thanks.html'));
    exit;
}

$env = [];
// Google reCAPTCHA Verification
$recaptchaSecret = '6LfjBG0tAAAAAN_OcQXh1ci7OFewVveYXDgtawVU';
$recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

if (empty($recaptchaResponse)) {
    die('Please complete the CAPTCHA.');
}

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$verifyData = [
    'secret' => $recaptchaSecret,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($verifyData)
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents($verifyUrl, false, $context);
$responseData = json_decode($result, true);

if (!$responseData['success']) {
    die('CAPTCHA verification failed. Please try again.');
}
if (is_file(__DIR__ . '/crm/.env')) {
    foreach (file(__DIR__ . '/crm/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) $env[trim($parts[0])] = trim(trim($parts[1]), "\"'");
    }
}

$dbPath = $env['DB_PATH'] ?? 'crm/storage/database.sqlite';
if (!str_starts_with($dbPath, '/')) $dbPath = __DIR__ . '/crm/' . $dbPath;

$pdo = new PDO('sqlite:' . $dbPath);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$apiKey = $_POST['api_key'] ?? '';
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');
$redirect = $_POST['_redirect'] ?? 'thanks.html';

// Validate API key
$stmt = $pdo->prepare('SELECT id, name, success_message FROM sites WHERE api_key = ? AND active = 1');
$stmt->execute([$apiKey]);
$site = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$site) {
    die('Invalid form key.');
}

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    die('All fields are required.');
}

// Insert lead
$stmt = $pdo->prepare('INSERT INTO leads (site_id, name, email, phone, message, ip_address, user_agent, referrer, status, is_spam, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, datetime(\'now\'))');
$stmt->execute([
    $site['id'],
    $name,
    $email,
    $phone,
    $message,
    $_SERVER['REMOTE_ADDR'] ?? '',
    $_SERVER['HTTP_USER_AGENT'] ?? '',
    $_SERVER['HTTP_REFERER'] ?? '',
    'new'
]);

$leadId = $pdo->lastInsertId();

// Log activity
$stmt = $pdo->prepare('INSERT INTO lead_activity (lead_id, type, body) VALUES (?, \'created\', ?)');
$stmt->execute([$leadId, 'Lead captured from ' . $site['name']]);

// Redirect
header('Location: ' . $redirect);
exit;
