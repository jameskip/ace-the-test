/* global page browser */
/* eslint-disable no-global-assign */

describe('Login and logout', () => {
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

  it('should be titled "Aceable | User"', async () => {
    try {
      await expect(page.title()).resolves.toMatch('Aceable | User')
    } catch (e) {
      throw new Error(e)
    }
  })

  it('should log user in with valid login"', async () => {
    try {
      // Submit sigin form
      await page.type('#email', 'borisyeltsin@xiixii.pw')
      await page.type('#password', 'Whoami12?')
      await page.click('[type=submit]')
      // Assert
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/login/screenshots/validLoginAttempt.png' })
    } catch (e) {
      throw new Error(e)
    }
  })

  it('should log user out"', async () => {
    try {
      await page.click('#nav-user-signout')
      await expect(page.url()).toMatch('https://ace-web-stg.herokuapp.com/user/signin')
      await page.screenshot({ path: './tests/login/screenshots/signOut.png' })
    } catch (e) {
      throw new Error(e)
    }
  })
})
