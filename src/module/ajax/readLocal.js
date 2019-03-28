/**
 * 读取本地浏览器选择的文件
 * @param {File} file 选择的文件
 * @param { readLocal.DataURL | readLocal.Text | readLocal.BinaryString | readLocal.ArrayBuffer } [type=readLocal.DataURL] 读取的类型，默认按照二进制 url 读取
 * @param {String} encoding 读取的编码格式，默认为 UTF-8
 * @returns {Promise} 返回了读取到的内容（异步）
 */
const readLocal = (() => {
  const result = (file, { type = 'readAsDataURL', encoding = 'UTF-8' } = {}) =>
    new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('file not exists'))
      }
      const fr = new FileReader()
      fr.onload = event => {
        resolve(event.target.result)
      }
      fr.onerror = error => {
        reject(error)
      }
      fr[type](file, encoding)
    })
  result.DataURL = 'readAsDataURL'
  result.Text = 'readAsText'
  result.BinaryString = 'readAsBinaryString'
  result.ArrayBuffer = 'readAsArrayBuffer'
  return result
})()

export default readLocal
