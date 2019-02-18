/* global page */
const faker = require('faker')

module.exports = {
  async signUp () {
    const randomUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    try {
      await page.type('#email', randomUser.email)
      await page.type('#firstName', randomUser.name)
      await page.type('#password', randomUser.password)
      await page.click('select.form-control')
      await page.type('select.form-control', 'Texas Pre-License Required - Law of Agency')
      await page.screenshot({ path: './tests/course/screenshots/signup.png' })
      await page.click('[type="submit"]')
      // Assert
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/signup-after.png' })
      await expect(page).toMatch('Texas Pre-License Required - Law of Agency')
    } catch (e) {
      throw new Error(e)
    }
  },

  async verify () {
    try {
      // TODO:
      expect(true).toBe(true)
    } catch (e) {
      throw new Error(e)
    }
  },

  async login () {
    try {
      // Submit sigin form
      await page.type('#email', 'creed@dundermifflin.com')
      await page.type('#password', 'Whoami12?')
      await page.click('[type=submit]')
      // Assert
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/course/screenshots/validLoginAttempt.png' })
    } catch (e) {
      throw new Error(e)
    }
  },

  async purchase () {
    try {
      // Navigate to purchase page
      await page.goto('https://ace-web-stg.herokuapp.com/activity/upgrade')
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
      await page.waitForSelector('section[class="content-block"]')
      await page.screenshot({ path: './tests/course/screenshots/done.png' })
      await expect(page).toClick('button[value="Continue"]')
    } catch (e) {
      throw new Error(e)
    }
  }
}
