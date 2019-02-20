/* global page browser */
/* eslint-disable no-global-assign */
const faker = require('faker')
const helpers = require('../helpers.js')

describe('Course', () => {
  jest.setTimeout(10000)
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
      await page.type('select.form-control', 'Texas Pre-License - Law of Agency')
      await page.screenshot({ path: './tests/course/screenshots/1-signup.png' })
      await page.click('[type="submit"]')
      // Assert
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/2-signup-after.png' })
      await expect(page).toMatch('Texas Pre-License - Law of Agency')
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
      await page.screenshot({ path: './tests/course/screenshots/3-purchase.png' })
      await page.click('[type="submit"]')
      // Assert
      await page.waitForSelector('button[value="Continue"]')
      await page.screenshot({ path: './tests/course/screenshots/4-continue.png' })
      await page.click('button[value="Continue"]')
      await page.screenshot({ path: './tests/course/screenshots/5-resume-course.png' })
    } catch (e) {
      throw new Error(e)
    }
  })

  it('Should verify agreement', async () => {
    try {
      await page.click('button.ace-btn')
      await page.waitForSelector('.ace-btn.ace-btn--secondary.ace-btn--wide--somewhat.mt5')
      await page.screenshot({ path: './tests/course/screenshots/6-verify.png' })
      await page.click('.ace-btn.ace-btn--secondary.ace-btn--wide--somewhat.mt5')
      await page.waitForNavigation()

      await page.screenshot({ path: './tests/course/screenshots/7-agreement.png' })
      await page.type('#input__AGREEMENTS_INLINE_CONTRACT', randomUser.name)
      await page.click('button.ace-btn.ace-btn--primary')
      await page.screenshot({ path: './tests/course/screenshots/8-agreement-filled.png' })
      await page.waitForSelector('#input__PHONE_NUMBER')

      await page.type('#input__PHONE_NUMBER', randomUser.phone)
      await page.type('#input__LAST_NAME', randomUser.last)
      await page.type('#input__BIRTH_DATE', randomUser.dob)
      await page.screenshot({ path: './tests/course/screenshots/9-gen-info.png' })
      await page.click('button.ace-btn.ace-btn--primary')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/10-verification.png' })
    } catch (e) {
      throw new Error(e)
    }
  })
})
