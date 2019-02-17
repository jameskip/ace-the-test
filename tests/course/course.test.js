/* global page browser */
/* eslint-disable no-global-assign */
const { login, purchase } = require('./helpers.js')

describe('Course', () => {
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

  it('Course Test 1', async (done) => {
    try {
      const url = await page.url()
      console.log({ url })
      await login()
      await page.screenshot({ path: './tests/course/screenshots/test.png' })
      done()
    } catch (e) {
      throw new Error(e)
    }
  })
})
