// @ts-check
/**
 * 读取本地浏览器选择的文件
 * @param {File} file 选择的文件
 * @param {Object} option 可选项参数
 * @param { readLocal.DataURL | readLocal.Text | readLocal.BinaryString | readLocal.ArrayBuffer } [option.type=readLocal.DataURL] 读取的类型，默认按照二进制 url 读取
 * @param {String} [option.encoding='UTF-8'] 读取的编码格式，默认为 UTF-8
 * @returns {Promise} 返回了读取到的内容（异步）
 */
export function readLocal (
  file,
  { type = readLocal.DataURL, encoding = 'UTF-8' } = {}
) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('file not exists'))
    }
    const fr = new FileReader()
    fr.onload = event => {
      // @ts-ignore
      resolve(event.target.result)
    }
    fr.onerror = error => {
      reject(error)
    }
    fr[type](file, encoding)
  })
}
readLocal.DataURL = 'readAsDataURL'
readLocal.Text = 'readAsText'
readLocal.BinaryString = 'readAsBinaryString'
readLocal.ArrayBuffer = 'readAsArrayBuffer'
