const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir);

let modifiedHtmlFiles = 0;

for (const file of files) {
    if (file.endsWith('.html')) {
        const filePath = path.join(rootDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Replace US$ or USD$ with $
        content = content
            .replace(/US\s*\$/g, '$')
            .replace(/USD\s*\$/g, '$')
            .replace(/US\s*(\$\d+)/g, '$1')
            .replace(/\bUSD\s+(\d+)/g, '$$$1')
            .replace(/(\$\d+)\s*USD\b/g, '$1');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedHtmlFiles++;
            console.log(`Sanitized currency in ${file}`);
        }
    }
}

console.log(`Total HTML files updated: ${modifiedHtmlFiles}`);
