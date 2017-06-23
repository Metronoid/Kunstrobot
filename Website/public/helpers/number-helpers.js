
const TryParseInt = (str, number) => {
  if (!Number.isNaN(str)) {
    return false
  }
  return parseInt(str)
}

export default TryParseInt
