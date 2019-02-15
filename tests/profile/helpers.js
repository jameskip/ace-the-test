module.exports = {
  makeADob () {
    let randomDob = {
      month: Math.floor(Math.random() * 12) + 1,
      day: Math.floor(Math.random() * 29) + 1,
      year: Math.floor(Math.random() * (2000 - 1900 + 1) + 1900)
    }
    console.log(randomDob)
    return `${randomDob.month}/${randomDob.day}/${randomDob.year}`
  },

  makeANumber () {
    let randomArea = Math.floor(Math.random() * (800 - 200 + 1) + 200)
    let randomPre = Math.floor(Math.random() * (800 - 200 + 1) + 200)
    let randomSuf = Math.floor(Math.random() * (8000 - 2000 + 1) + 2000)

    return `${randomArea}-${randomPre}-${randomSuf}`
  }
}
