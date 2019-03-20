/**
 * 读取本地浏览器选择的文件
 * @param {File} file 选择的文件
 * @param { readLocal.DataURL | readLocal.Text | readLocal.BinaryString | readLocal.ArrayBuffer } [type=readLocal.DataURL] 读取的类型，默认为
 * @returns {Promise} 返回了读取到的内容（异步）
 */
const readLocal = (() => {
  const result = (file, { type = 'readAsDataURL' } = {}) =>
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
      fr[type](file)
    })
  result.DataURL = 'readAsDataURL'
  result.Text = 'readAsText'
  result.BinaryString = 'readAsBinaryString'
  result.ArrayBuffer = 'readAsArrayBuffer'
  return result
})()

export default readLocal
