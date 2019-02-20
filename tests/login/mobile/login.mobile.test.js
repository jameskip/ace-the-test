/* global page browser */
/* eslint-disable no-global-assign */

const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

describe('Mobile - Login and logout', () => {
  beforeAll(async () => {
    try {
      await page.emulate(iPhone)
      await page.goto('https://ace-web-stg.herokuapp.com/user/signin')
    } catch (e) {
      throw new Error(e)
    }
  })

  afterAll(async () => {
    try {
      await page.close()
      page = await browser.newPage()
    } catch (e) {
      throw new Error(e)
    }
  })

  it('should log user in with valid login"', async () => {
    try {
      // Submit sigin form
      await page.type('#email', 'creed@dundermifflin.com')
      await page.type('#password', 'Whoami12?')
      await page.click('[type=submit]')
      // Assert
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/login/screenshots/m-1-valid-login.png' })
    } catch (e) {
      throw new Error(e)
    }
  })

  it('should log user out"', async () => {
    try {
      await page.click('#header-menu-toggle')
      await page.click('#nav-user-signout')
      await page.screenshot({ path: './tests/login/screenshots/m-2-signout.png' })
    } catch (e) {
      throw new Error(e)
    }
  })
})
