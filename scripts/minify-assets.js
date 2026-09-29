const fs = require('fs');
const path = require('path');
let CleanCSS;
try {
  CleanCSS = require('clean-css');
} catch (e) {
  CleanCSS = null;
}

let Terser;
try {
  Terser = require('terser');
} catch (e) {
  Terser = null;
}

const vm = require('vm');

function simpleMinifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([\{\};:,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function simpleMinifyJs(js) {
  // Safe: do not strip slashes via naive regex, keep code intact
  return js.trim();
}

async function minifyAssets() {
  console.log('[MINIFY] Starting asset minification...');

  // 1. Minify style.css
  const cssPath = path.join(__dirname, '../assets/css/style.css');
  const cssSrcPath = path.join(__dirname, '../assets/css/style.src.css');
  const cssMinPath = path.join(__dirname, '../assets/css/style.min.css');

  // Read original source (from .src.css if already backed up, else from style.css)
  const originalCss = fs.existsSync(cssSrcPath) ? fs.readFileSync(cssSrcPath, 'utf-8') : fs.readFileSync(cssPath, 'utf-8');
  if (!fs.existsSync(cssSrcPath)) {
    fs.writeFileSync(cssSrcPath, originalCss, 'utf-8');
  }

  const minifiedCss = CleanCSS ? new CleanCSS({
    level: {
      1: { all: true },
      2: { restructureRules: true }
    }
  }).minify(originalCss).styles : simpleMinifyCss(originalCss);

  fs.writeFileSync(cssMinPath, minifiedCss, 'utf-8');
  fs.writeFileSync(cssPath, minifiedCss, 'utf-8');
  console.log(`[MINIFY] CSS style.css: ${(originalCss.length / 1024).toFixed(1)} KB -> ${(minifiedCss.length / 1024).toFixed(1)} KB (-${((1 - minifiedCss.length / originalCss.length) * 100).toFixed(1)}%)`);

  // 2. Minify JavaScript files
  const jsFiles = ['app.js', 'script.js', 'components.js', 'data-service.js'];

  for (const file of jsFiles) {
    const rawPath = path.join(__dirname, '../assets/js', file);
    const srcPath = path.join(__dirname, '../assets/js', file.replace('.js', '.src.js'));
    const minPath = path.join(__dirname, '../assets/js', file.replace('.js', '.min.js'));

    const originalJs = fs.existsSync(srcPath) ? fs.readFileSync(srcPath, 'utf-8') : fs.readFileSync(rawPath, 'utf-8');
    if (!fs.existsSync(srcPath)) {
      fs.writeFileSync(srcPath, originalJs, 'utf-8');
    }

    let minifiedJs = originalJs;
    if (Terser) {
      try {
        const result = await Terser.minify(originalJs, {
          compress: {
            dead_code: true,
            drop_debugger: true,
            conditionals: true,
            evaluate: true
          },
          mangle: true
        });
        if (result && result.code) minifiedJs = result.code;
      } catch (err) {
        minifiedJs = simpleMinifyJs(originalJs);
      }
    } else {
      minifiedJs = simpleMinifyJs(originalJs);
    }

    try {
      new vm.Script(minifiedJs);
    } catch (syntaxErr) {
      console.warn(`[MINIFY] Warning: Minified ${file} had syntax issues, reverting to original.`, syntaxErr.message);
      minifiedJs = originalJs;
    }

    fs.writeFileSync(minPath, minifiedJs, 'utf-8');
    fs.writeFileSync(rawPath, minifiedJs, 'utf-8');
    console.log(`[MINIFY] JS ${file}: ${(originalJs.length / 1024).toFixed(1)} KB -> ${(minifiedJs.length / 1024).toFixed(1)} KB (-${((1 - minifiedJs.length / originalJs.length) * 100).toFixed(1)}%)`);
  }

  // 3. Update HTML references to use .min.css and .min.js
  const htmlFiles = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));
  let updatedHtmlCount = 0;

  for (const hFile of htmlFiles) {
    const filePath = path.join(__dirname, '..', hFile);
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Replace style.css with style.min.css (if not already min)
    if (content.includes('/assets/css/style.css') && !content.includes('/assets/css/style.min.css')) {
      content = content.replace(/\/assets\/css\/style\.css/g, '/assets/css/style.min.css');
      modified = true;
    }

    // Replace JS files with .min.js
    for (const js of jsFiles) {
      const standardRef = `/assets/js/${js}`;
      const minRef = `/assets/js/${js.replace('.js', '.min.js')}`;
      if (content.includes(standardRef) && !content.includes(minRef)) {
        content = content.replaceAll(standardRef, minRef);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      updatedHtmlCount++;
    }
  }

  console.log(`[MINIFY] Updated asset references across ${updatedHtmlCount} HTML files.`);
  console.log('[MINIFY] All assets successfully minified and linked!');
}

minifyAssets().catch(err => {
  console.error('[MINIFY ERROR]', err);
  process.exit(1);
});
