/* global page browser */
/* eslint-disable no-global-assign */
const { signUp, verify, login, purchase } = require('./helpers.js')

describe('Course', () => {
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

  it('Should verify agreement', async (done) => {
    try {
      await signUp()
      await verify()
      await page.screenshot({ path: './tests/course/screenshots/verify.png' })
      done()
    } catch (e) {
      throw new Error(e)
    }
  })
})
