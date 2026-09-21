export default (adress) => {
  try {
    const urlObject = new URL(adress)
    return urlObject && true
  }
  catch (error) {
    if (error) {
      return false
    }
  }
}
