require("dotenv").config()
const puppeteer = require("puppeteer")

// page wait times are specified in milliseconds
const SECOND = 1000

const backup = async () => {

    console.log("Opening browser...")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    try {
        await page._client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: process.cwd()
        });

        console.log("Navigating to Roam Research...")
        await page.goto("https://roamresearch.com/#/signin")

        console.log("Logging into Roam...")

        await page.waitFor('[name="email"]')
        await page.focus('[name="email"]')
        await page.keyboard.type(process.env.ROAM_EMAIL)

        await page.waitFor('[name="password"]')
        await page.focus('[name="password"]')
        await page.keyboard.type(process.env.ROAM_PASSWORD)

        await page.evaluate(() => {
            [...document.querySelectorAll('.bp3-button')].find(btn => btn.textContent === 'Sign In').click()
        })

        await page.waitFor(5 * SECOND)
        await page.screenshot({ path: "logged_in.png" })

    } catch (err) {
        console.error("Something went wrong!")
        console.error(err)

        await page.screenshot({ path: "error.png" })
    }
    await browser.close()
}

backup()

