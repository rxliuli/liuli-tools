/**
 * 获取 cookie 键值映射对象
 * @returns {Object} cookie 键值映射对象
 */
function getCookies() {
  return document.cookie
    .split(';')
    .map(str => str.split('='))
    .map(arr => {
      arr[0] = arr[0].trim()
      arr[1] = arr[1].trim()
      return arr
    })
    .filter(arr => arr[0] && arr[1])
    .reduce((res, arr) => {
      res[arr[0]] = arr[1]
      return res
    }, {})
}

export default getCookies
