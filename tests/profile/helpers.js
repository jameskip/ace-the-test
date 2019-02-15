module.exports = {
  makeADob () {
    let randomDob = {
      month: Math.floor(Math.random() * 12) + 1,
      day: Math.floor(Math.random() * 29) + 1,
      year: Math.floor(Math.random() * (2000 - 1900 + 1) + 1900)
    }
    console.log(randomDob)
    return `${randomDob.month}/${randomDob.day}/${randomDob.year}`
  }
}
