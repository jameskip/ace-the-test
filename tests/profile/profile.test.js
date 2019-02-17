/* global page browser */
/* eslint-disable no-global-assign */

const faker = require('faker')
const { makeADob, makeANumber, pickAGender, makeAzip } = require('./helpers.js')

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
      // Submit login form
      await page.type('#email', 'creed@dundermifflin.com')
      await page.type('#password', 'Whoami12?')
      await page.click('[type=submit]')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/profile/screenshots/validLoginAttempt.png' })
    } catch (e) {
      throw new Error(e)
    }
  })

  it('Should pull correct user information', async () => {
    try {
      // Open user profile
      await page.click('#nav-user-profile')
      await page.waitForNavigation()
      await page.screenshot({ path: './tests/profile/screenshots/profile.png' })
      await expect(page.title()).resolves.toMatch('Aceable Agent | Profiler')
    } catch (e) {
      throw new Error(e)
    }
  })

  it('Should complete profile information', async () => {
    try {
      const randomCard = faker.helpers.createCard()
      const [first, last] = randomCard.name.split(' ')

      const fakeInfo = {
        email: randomCard.email,
        phone: makeANumber(),
        first,
        last,
        dob: makeADob(),
        gender: pickAGender(),
        address: randomCard.address.streetB,
        city: randomCard.address.city,
        state: randomCard.address.state,
        zip: makeAzip()
      }
      console.log({ fakeInfo })

      await expect(page).toFillForm('form[name="profileForm"]', {
        // EMAIL_ADDRESS: fakeInfo.email, // actually changing the email of a test account will break some tests
        PHONE_NUMBER: fakeInfo.phone,
        FIRST_NAME: fakeInfo.first,
        LAST_NAME: fakeInfo.last,
        BIRTH_DATE: fakeInfo.dob,
        GENDER: fakeInfo.gender,
        ADDRESS_STREET: fakeInfo.address,
        ADDRESS_CITY: fakeInfo.city,
        ADDRESS_STATE: fakeInfo.state,
        ADDRESS_POSTAL: fakeInfo.zip
      })

      await expect(page).toClick('button', { text: 'Save' })
      await page.screenshot({ path: './tests/profile/screenshots/profileForm.png' })
      await page.waitForSelector('button.ace-btn.ace-btn--secondary')
      await page.screenshot({ path: './tests/profile/screenshots/welcome.png' })
    } catch (e) {
      throw new Error(e)
    }
  })
})
