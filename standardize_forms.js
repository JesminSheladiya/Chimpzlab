const fs = require('fs');
const path = require('path');

const rootDir = '/Users/fenmac2/Jesmin/chimpzlab';

function getDepthPrefix(filePath) {
    const relative = path.relative(rootDir, filePath);
    const depth = relative.split(path.sep).length - 1;
    if (depth === 0) return '';
    return '../'.repeat(depth);
}

function processFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (['node_modules', '.git', 'asset', 'data', 'crm'].includes(file)) continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processFiles(fullPath);
        } else if (file.endsWith('.html') && fullPath !== path.join(rootDir, 'index.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            const formRegex = /<form[^>]*class="[^"]*space-y-6[^"]*"[^>]*>([\s\S]*?)<\/form>/;
            
            if (formRegex.test(content)) {
                const match = content.match(formRegex);
                const formInnerHtml = match[1];
                
                // Extract input class (finding the first input that has a class)
                const inputRegex = /<input[^>]*class="([^"]+)"/;
                const inputMatch = formInnerHtml.match(inputRegex);
                let inputClass = "w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-brand-dark placeholder-gray-500 focus:outline-none focus:border-brand-dark transition-colors";
                if (inputMatch) {
                    inputClass = inputMatch[1];
                }
                const textareaClass = inputClass + " resize-none";
                
                // Extract button class
                const buttonRegex = /<button[^>]*class="([^"]+)"/;
                const buttonMatch = formInnerHtml.match(buttonRegex);
                let buttonClass = "interactive w-fit bg-brand-dark hover:bg-black text-white px-8 py-4 rounded-full text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2";
                if (buttonMatch) {
                    buttonClass = buttonMatch[1];
                }
                
                const depthPrefix = getDepthPrefix(fullPath);
                
                const newForm = `<form id="contactForm" class="space-y-6" method="POST" action="${depthPrefix}lead-capture.php">
                        <!-- Top Row Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <input type="text" name="name" placeholder="Your Name *" minlength="2" maxlength="100"
                                    pattern="[A-Za-zÀ-ÿ\\s\\.\\-']+"
                                    title="Please enter a valid name (letters, spaces, hyphens only)"
                                    class="${inputClass}"
                                    required>
                                <p class="error-msg text-red-500 text-xs mt-1 hidden">Please enter your full name.</p>
                            </div>
                            <div>
                                <input type="email" name="email" placeholder="Email *" maxlength="254"
                                    pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$"
                                    title="Please enter a valid email address"
                                    class="${inputClass}"
                                    required>
                                <p class="error-msg text-red-500 text-xs mt-1 hidden">Please enter a valid email
                                    address.</p>
                            </div>
                        </div>
                        <!-- Phone -->
                        <div>
                            <input type="tel" name="phone" placeholder="Phone *" minlength="10" maxlength="15"
                                pattern="[\\+\\d\\s\\-\\(\\)]{10,15}" title="Please enter a valid phone number (10-15 digits)"
                                class="${inputClass}"
                                required>
                            <p class="error-msg text-red-500 text-xs mt-1 hidden">Please enter a valid phone number (min
                                10 digits).</p>
                        </div>
                        <!-- Textarea -->
                        <div>
                            <textarea name="message" placeholder="Tell us about your project *" rows="4" minlength="10"
                                maxlength="2000"
                                class="${textareaClass}"
                                required></textarea>
                            <p class="error-msg text-red-500 text-xs mt-1 hidden">Message must be at least 10
                                characters.</p>
                        </div>

                        <!-- Honeypot: invisible to humans, bots love it -->
                        <div style="position:absolute;left:-9999px;top:-9999px" aria-hidden="true">
                            <label>Leave this blank</label>
                            <input type="text" name="_hp" tabindex="-1" autocomplete="off">
                        </div>

                        <!-- Hidden fields -->
                        <input type="hidden" name="api_key" value="3afc0840e1193e58397159d4af15cf4a15b5b35c">
                        <input type="hidden" name="_redirect" value="${depthPrefix}thanks.html">

                        <!-- Submit Button -->
                        <div class="pt-6">
                            <button type="submit" id="submitBtn"
                                class="${buttonClass}">
                                Send Message
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </button>
                        </div>
                    </form>`;
                
                content = content.replace(formRegex, newForm);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated form in ${fullPath}`);
            }
        }
    }
}

processFiles(rootDir);
console.log("Done standardizing forms.");
