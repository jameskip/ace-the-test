module.exports = {
  makeADob () {
    let randomDob = {
      month: Math.floor(Math.random() * 12) + 1,
      day: Math.floor(Math.random() * 29) + 1,
      year: Math.floor(Math.random() * (2000 - 1900 + 1) + 1900)
    }

    if (randomDob.month < 10) {
      randomDob.month = '0' + randomDob.month
    }
    if (randomDob.day < 10) {
      randomDob.day = '0' + randomDob.day
    }

    return `${randomDob.month}/${randomDob.day}/${randomDob.year}`
  },

  makeANumber () {
    let randomNum = {
      area: Math.floor(Math.random() * (800 - 200 + 1) + 200),
      pre: Math.floor(Math.random() * (800 - 200 + 1) + 200),
      suf: Math.floor(Math.random() * (8000 - 2000 + 1) + 2000)
    }

    return `${randomNum.area}-${randomNum.pre}-${randomNum.suf}`
  },

  makeAzip () {
    return String(Math.floor(Math.random() * (99999 - 10000 + 1) + 10000))
  },

  pickAGender () {
    return Math.random() >= 0.5 ? 'Male' : 'Female'
  }
}
