require("dotenv").config()
const puppeteer = require("puppeteer")

// page wait times are specified in milliseconds
const SECOND = 1000

// puppeteer navigates a page using its html
// this collection of selectors can be used to find relevant elements
// naturally, the html of a web page is liable to change without warning,
// which could lead to unexpected behaviour
const selectors = {
    'email': '[name="email"]',
    'password': '[name="password"]',
    'button': '.bp3-button',
    'menu': '.bp3-icon-more',
    'exportItem': '.bp3-menu > li:nth-child(4)',
    'exportButton': '.bp3-intent-primary'
}

const urls = {
    'authenticate': 'https://roamresearch.com/#/signin',
    'database': `https://roamresearch.com/#/app/${process.env.ROAM_DATABASE}`
}

const download = async () => {

    console.log("Opening browser...")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    try {
        await page._client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: process.cwd()
        })

        console.log("Navigating to Roam Research...")
        await page.goto(urls.authenticate)

        console.log("Logging into Roam...")

        await page.waitFor(selectors.email)
        await page.focus(selectors.email)
        await page.keyboard.type(process.env.ROAM_EMAIL)

        await page.waitFor(selectors.password)
        await page.focus(selectors.password)
        await page.keyboard.type(process.env.ROAM_PASSWORD)

        // the first button is the sign-in button
        await page.waitFor(selectors.button)
        await page.click(selectors.button)

        console.log("Navigating to database...")
        await page.goto(urls.database)

        console.log("Exporting data...")
        await page.waitFor(selectors.menu)
        await page.click(selectors.menu)

        await page.waitFor(selectors.exportItem)
        await page.click(selectors.exportItem)

        await page.waitFor(selectors.exportButton)
        await page.click(selectors.exportButton)

        console.log("Waiting 30 seconds for the backup to download...")
        await page.waitFor(30 * SECOND)
        await page.screenshot({ path: "logged_in.png" })

    } catch (err) {
        console.error("Something went wrong!")
        console.error(err)

        await page.screenshot({ path: "error.png" })
    }
    await browser.close()
}

download()

