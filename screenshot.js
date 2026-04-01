/**
 * GIGAglas — Puppeteer screenshot tool
 * Captures each horizontal panel at 1440×900 (2× retina) plus a wide full-scroll strip.
 * Output: .tmp/screenshots/
 *
 * Usage:  node screenshot.js
 *         npm run screenshot
 */

const puppeteer = require('puppeteer');
const http      = require('http');
const fs        = require('fs');
const path      = require('path');

// ── Static file server ────────────────────────────────────
const MIME = {
  '.html': 'text/html', '.css': 'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml', '.otf': 'font/otf', '.ttf': 'font/ttf',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
};
const ROOT = __dirname;
const PORT = 5501;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
      filePath = filePath.split('?')[0];
      const ext = path.extname(filePath).toLowerCase();
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404); res.end('Not found');
      }
    });
    server.listen(PORT, () => { console.log(`Server → http://localhost:${PORT}`); resolve(server); });
  });
}

// ── Panels to capture ─────────────────────────────────────
const PANELS = [
  { name: '01-hero',       id: 'hero'         },
  { name: '02-about',      id: 'about'        },
  { name: '03-references', id: 'references'   },
  { name: '04-products',   id: 'products'     },
  { name: '05-why',        id: 'why'          },
  { name: '06-contact',    id: 'contact'      },
  { name: '07-footer',     id: 'footer-panel' },
];

const OUT = path.join(__dirname, '.tmp', 'screenshots');

// ── Main ──────────────────────────────────────────────────
(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const server  = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('\nLoading page…');
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

  // Kill animations so screenshots are crisp
  await page.addStyleTag({ content: `
    *, *::before, *::after {
      animation-duration: 0.001s !important;
      animation-delay:    0s    !important;
      transition-duration: 0s   !important;
    }
    .globe-canvas    { opacity: 1 !important; }
    .scroll-cue__line{ animation: none !important; }
    .globe-legend__dot{ animation: none !important; }
    .gallery-hint    { opacity: 0 !important; }
  `});

  // Give globe + gallery a moment to initialise
  await new Promise(r => setTimeout(r, 1200));

  // ── Scroll through each panel, capture at viewport size ──
  for (const panel of PANELS) {
    try {
      // Scroll the track so the panel is in view
      await page.evaluate((id) => {
        const track  = document.getElementById('scrollTrack');
        const target = document.getElementById(id);
        if (track && target) track.scrollLeft = target.offsetLeft;
      }, panel.id);

      await new Promise(r => setTimeout(r, 400));

      const outPath = path.join(OUT, `${panel.name}.png`);
      await page.screenshot({ path: outPath });
      console.log(`  ✓  ${panel.name}.png`);
    } catch (err) {
      console.error(`  ✗  ${panel.name}: ${err.message}`);
    }
  }

  // ── Wide strip: scroll track scrolled fully right ─────────
  await page.evaluate(() => {
    const track = document.getElementById('scrollTrack');
    if (track) track.scrollLeft = 0;
  });
  await new Promise(r => setTimeout(r, 300));
  const stripPath = path.join(OUT, '00-full-strip.png');
  await page.screenshot({ path: stripPath, fullPage: false });
  console.log(`  ✓  00-full-strip.png (viewport at start)`);

  await browser.close();
  server.close();
  console.log(`\nAll screenshots saved to  .tmp/screenshots/\n`);
})();
