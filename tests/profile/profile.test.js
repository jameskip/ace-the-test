/* global page browser */
/* eslint-disable no-global-assign */

describe('Profile', () => {
  beforeAll(async () => {
    try {
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
      await page.type('#email', 'borisyeltsin@xiixii.pw')
      await page.type('#password', 'Whoami12?')
      await page.click('[type=submit]')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/profile/screenshots/validLoginAttempt.png' })
    } catch (e) {
      throw new Error(e)
    }
  })
  it('Should pull correct user information', async (done) => {
    try {
      await page.click('#nav-user-profile')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/profile/screenshots/profile.png' })
      await expect(page.title()).resolves.toMatch('Aceable Agent | Profiler')
      done()
    } catch (e) {
      throw new Error(e)
    }
  })
})
