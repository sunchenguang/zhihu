/**
 * Created by suncg on 2017/4/1.
 */
module.exports = {
  getGender (str) {
    switch (str) {
      case '他':
        return 'male'
      case '她':
        return 'female'
      default:
        return undefined
    }
  }
}
