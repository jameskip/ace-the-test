/* global page browser */
/* eslint-disable no-global-assign */
const faker = require('faker')
const helpers = require('../helpers.js')

describe('Course', () => {
  const randomUser = {
    name: faker.name.firstName(),
    last: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dob: helpers.makeADob(),
    phone: helpers.makeANumber()
  }

  beforeAll(async () => {
    try {
      await page.goto('https://ace-web-stg.herokuapp.com/user/signup')
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
      await page.type('select.form-control', 'Texas Pre-License Required - Law of Agency')
      await page.screenshot({ path: './tests/course/screenshots/signup.png' })
      await page.click('[type="submit"]')
      // Assert
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/signup-after.png' })
      // await expect(page).toMatch('Texas Pre-License Required - Law of Agency')
    } catch (e) {
      throw new Error(e)
    }
  })

  it('User should be able to complete $99 purchase', async (done) => {
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
      await page.screenshot({ path: './tests/course/screenshots/purchase.png' })
      await page.click('[type="submit"]')
      // Assert
      await page.waitForSelector('button[value="Continue"]')
      await page.screenshot({ path: './tests/course/screenshots/done.png' })
      await page.click('button[value="Continue"]')
      await page.screenshot({ path: './tests/course/screenshots/done2.png' })
      done()
    } catch (e) {
      throw new Error(e)
    }
  })

  it('Should verify agreement', async () => {
    try {
      await page.click('button.ace-btn')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/verify.png' })
      await page.click('button.ace-btn.ace-btn--secondary')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/verify2.png' })
      await page.type('#input__AGREEMENTS_INLINE_CONTRACT', randomUser.name)
      await page.click('button.ace-btn.ace-btn--primary')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/verify3.png' })
      await page.type('#input__PHONE_NUMBER', randomUser.phone)
      await page.type('#input__LAST_NAME', randomUser.last)
      await page.type('#input__BIRTH_DATE', randomUser.dob)
      // await page.click('button.ace-btn.ace-btn--primary')
      // await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/verify4.png' })
    } catch (e) {
      throw new Error(e)
    }
  })

  it.skip('', async () => {
    try {

    } catch (e) {
      throw new Error(e)
    }
  })
})
