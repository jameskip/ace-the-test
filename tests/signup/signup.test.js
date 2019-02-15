/* global page browser */
/* eslint-disable no-global-assign */

const faker = require('faker')

describe('Signup', () => {
  const randomName = faker.name.firstName()
  const randomEmail = faker.internet.email()
  const randomPassword = faker.internet.password()

  beforeAll(async () => {
    try {
      await page.tracing.start({ path: './tests/signup/performance/signup-trace.json' })
      await page.goto('https://ace-web-stg.herokuapp.com/user/signup')
      await page.tracing.stop()
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
      console.log({ randomEmail, randomPassword, randomName })
      await page.type('#email', randomEmail)
      await page.type('#firstName', randomName)
      await page.type('#password', randomPassword)
      await page.click('select.form-control')
      await page.type('select.form-control', 'Texas Pre-License Required - Law of Agency')
      await page.screenshot({ path: './tests/signup/screenshots/signup.png' })
      await page.click('[type="submit"]')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/signup/screenshots/signup-after.png' })
      await expect(page).toMatch('Texas Pre-License Required - Law of Agency')
    } catch (e) {
      throw new Error(e)
    }
  })

  it('User should be able to complete $99 purchase', async () => {
    try {
      await page.click('button.ace-btn')
      await page.waitForNavigation()
      await expect(page).toFillForm('form[name="checkout"]', {
        number: '4242424242424242',
        expiry: '12/22',
        cvc: '999'
      })
      await page.click('#tandc')
      await page.screenshot({ path: './tests/signup/screenshots/purchase.png' })
      await page.click('[type="submit"]')
      await page.waitForSelector('section[class="content-block"]')
      await page.screenshot({ path: './tests/signup/screenshots/done.png' })
      await expect(page).toClick('button[value="Continue"]')
    } catch (e) {
      throw new Error(e)
    }
  })
})
