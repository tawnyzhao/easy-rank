const puppeteer = require('puppeteer');
const mailer = require('./mailer.js');
const config = require('./config.json');
const DEBUG = process.argv.includes('--dev');

const reload = async (page, text) => {
    await page.reload();
    const rankings = await page.$("#mainContentDiv > div.orbisTabContainer > div.tab-content");
    const currentText = await page.evaluate(rankings => rankings.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim(), rankings);
    if (currentText === text) {
        console.log("Rankings are out!");
        if (DEBUG) {
            console.log(text);
            console.log("------------");
            console.log(currentText);
        }
        await page.screenshot({ path: 'screenshot.png', fullPage: true });
        await mailer.sendEmail(text, 'screenshot.png')
        process.exit(0);        
    }
    console.log("Checked at: " + new Date().toJSON().slice(0, 19).replace(/[-T]/g, ':'));
}

const initialNavigation = async (page) => {
    await page.goto('https://waterlooworks.uwaterloo.ca/home.htm');
    await page.click("a.btn--landing");
    await page.waitForNavigation();
    await page.type('#userNameInput', config.email);
    await page.click("#nextButton");
    await page.type("#passwordInput", config.password);
    await page.click("#submitButton");
    await page.waitForSelector("#displayStudentMyRankings > a");
    await page.click("#displayStudentMyRankings > a");
}

(async () => {
    const browser = await puppeteer.launch(
        { headless: !DEBUG }
    );

    const page = await browser.newPage();
    await initialNavigation(page);

    await page.waitForSelector("#mainContentDiv > div.orbisTabContainer > div.tab-content");
    const rankings = await page.$("#mainContentDiv > div.orbisTabContainer > div.tab-content");
    const text = await page.evaluate(rankings => rankings.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim(), rankings);
    await page.screenshot({ path: 'screenshot.png' });
    await reload(page,text);
    setInterval((page, text) => reload(page, text), config.delay, page, text);
})();
