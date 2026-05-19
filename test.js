const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    page.on('requestfailed', request => console.log('REQ FAIL:', request.url(), request.failure().errorText));

    // Load the local HTML file
    await page.goto(`file://${process.cwd()}/index.html`, { waitUntil: 'networkidle0' });

    // Dump the body HTML to see what's actually rendered
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('BODY HTML LENGTH:', html.length);

    await browser.close();
})();
