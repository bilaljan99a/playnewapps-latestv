const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="products-grid" id="products-grid">[\s\S]*?<\/section>/;
const newContent = `<div class="products-grid" id="products-grid">
                <!-- Loaded dynamically via app.js -->
            </div>
        </section>`;

if (regex.test(html)) {
    html = html.replace(regex, newContent);
    fs.writeFileSync('index.html', html);
    console.log('Cleared products grid in index.html');
}
