const scrapeMovie = async function () {
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://letterboxd.com/luiv/watchlist/')

    await page.waitFor(2000);

    const selected = Math.floor(Math.random() * (100)) + 1;
    console.log(selected)

    await page.waitFor(1000);
    await page.screenshot({path: 'L1.png'});
    try {
        const [film] = await page.$x(`//*[@id="content"]/div/div[1]/section/ul/li[${selected}]/div/div/a`);
        ////*[@id="content"]/div/div[1]/section/ul/li[30]/div/div/a
        ////*[@id="content"]/div/div[1]/section/ul/li[37]/div/div/a
        const link = await film.getProperty('href');
        console.log(link)
        const rawLink = link._remoteObject.value;
        console.log(rawLink)
    } catch (e) {
        console.log("catch: " + e)
    }
    
    
    film.click();

    await page.waitFor(3000);
    await page.screenshot({path: 'L2.png'});

    const actor1 = await page.$x('//*[@id="tab-cast"]/div/p/a[1]')
    const rawactor1 = await actor1.jsonValue();

    console.log(obj)
    browser.close();
}

module.exports = scrapeMovie();