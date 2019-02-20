/* global page browser */
/* eslint-disable no-global-assign */

const faker = require('faker')

describe('Signup', () => {
  jest.setTimeout(10000)
  const randomUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  beforeAll(async () => {
    try {
      // await page.tracing.start({ path: './tests/signup/performance/signup-trace.json' })
      await page.goto('https://ace-web-stg.herokuapp.com/user/signup')
      // await page.tracing.stop()
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

  it('User should signup using new credentials', async () => {
    try {
      // Submit signup form
      await page.waitForSelector('#email')
      await page.type('#email', randomUser.email)
      await page.type('#firstName', randomUser.name)
      await page.type('#password', randomUser.password)
      await page.click('select.form-control') // HACK: to select dropdown and not generate error
      await page.type('select.form-control', 'Texas Pre-License - Law of Agency')
      await page.screenshot({ path: './tests/signup/screenshots/1-signup.png' })
      await page.click('[type="submit"]')
      // Assert
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/signup/screenshots/2-signup-after.png' })
    } catch (e) {
      throw new Error(e)
    }
  })

  it('User should be able to complete $99 purchase', async () => {
    try {
      // Navigate to purchase page
      await page.click('button.ace-btn')
      await page.waitForNavigation()
      // Submit checkout form
      await expect(page).toFillForm('form[name="checkout"]', {
        number: '4242424242424242',
        expiry: '12/22',
        cvc: '999'
      })
      await page.click('#tandc') // Terms and Conditions
      await page.screenshot({ path: './tests/signup/screenshots/3-purchase.png' })
      await page.click('[type="submit"]')
      // Assert
      await page.waitForSelector('button[value="Continue"]')
      await page.screenshot({ path: './tests/signup/screenshots/4-done.png' })
    } catch (e) {
      throw new Error(e)
    }
  })
})
