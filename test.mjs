import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    // Load the local HTML file
    await page.goto(`file://${process.cwd()}/index.html`, { waitUntil: 'domcontentloaded' });

    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('BODY HTML LENGTH:', html.length);

    await browser.close();
})();
