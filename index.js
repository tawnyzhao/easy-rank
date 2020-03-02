const puppeteer = require('puppeteer');
const config = require('./config.json');

(async () => {
    const browser = await puppeteer.launch(
        {headless: false}
    );

    const page = await browser.newPage();
    await page.goto('https://waterlooworks.uwaterloo.ca/home.htm');
    await page.click("a.btn--landing");
    await page.waitForNavigation();

    await page.type('#userNameInput', config.email);
    await page.click("#nextButton");
    await page.type("#passwordInput", config.password);
    await page.click("#submitButton");
    await page.waitForSelector("#displayStudentMyRankings > a");
    await page.click("#displayStudentMyRankings > a");
    await page.waitForSelector("#mainContentDiv > div.orbisTabContainer > div.tab-content");
    const rankings = await page.$("#mainContentDiv > div.orbisTabContainer > div.tab-content");
    const text = await page.evaluate(rankings => rankings.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim(), rankings);
    console.log(text);
    await page.screenshot({ path: 'screenshot.png' });
})();
