/* global page */

module.exports = {
  async login () {
    try {
      // Submit sigin form
      // await page.goto('https://ace-web-stg.herokuapp.com/user/signin')
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
      // TODO:
      // await expect(page).toClick('button', { text: 'Resume Course ' })
      // await page.waitForNavigation()
      // await page.screenshot({ path: './tests/course/screenshots/done-for-real.png' })
    } catch (e) {
      throw new Error(e)
    }
  }
}
