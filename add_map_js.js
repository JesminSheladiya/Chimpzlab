const fs = require('fs');
const path = require('path');

const rootDir = '/Users/fenmac2/Jesmin/chimpzlab';

const scriptToAdd = `
    <script>
        // Location Map Modal Functionality
        (function() {
            const locationLink = document.getElementById('location-link');
            const mapModal = document.getElementById('map-modal');
            const mapModalContent = document.getElementById('map-modal-content');
            const closeMapModal = document.getElementById('close-map-modal');

            if (locationLink && mapModal) {
                locationLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    mapModal.classList.remove('opacity-0', 'pointer-events-none');
                    if (mapModalContent) {
                        mapModalContent.classList.remove('scale-95');
                        mapModalContent.classList.add('scale-100');
                    }
                });

                const closeModal = () => {
                    mapModal.classList.add('opacity-0', 'pointer-events-none');
                    if (mapModalContent) {
                        mapModalContent.classList.remove('scale-100');
                        mapModalContent.classList.add('scale-95');
                    }
                };

                if (closeMapModal) {
                    closeMapModal.addEventListener('click', closeModal);
                }

                mapModal.addEventListener('click', (e) => {
                    if (e.target === mapModal) {
                        closeModal();
                    }
                });

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && !mapModal.classList.contains('pointer-events-none')) {
                        closeModal();
                    }
                });
            }
        })();
    </script>
`;

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
            if (!content.includes('// Location Map Modal Functionality')) {
                // Add right before </body>
                const bodyEndIndex = content.lastIndexOf('</body>');
                if (bodyEndIndex !== -1) {
                    content = content.substring(0, bodyEndIndex) + scriptToAdd + content.substring(bodyEndIndex);
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Added JS to ${fullPath}`);
                }
            }
        }
    }
}

processFiles(rootDir);
console.log("Done adding map JS.");
