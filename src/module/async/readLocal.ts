enum ReadType {
  DataURL = 'readAsDataURL',
  Text = 'readAsText',
  BinaryString = 'readAsBinaryString',
  ArrayBuffer = 'readAsArrayBuffer',
}
interface IReadLocalInit {
  type: ReadType
  encoding: string
}
/**
 * 读取本地浏览器选择的文件
 * @param file 选择的文件
 * @param option 可选项参数
 * @param [option.type=readLocal.DataURL] 读取的类型，默认按照二进制 url 读取
 * @param [option.encoding='UTF-8'] 读取的编码格式，默认为 UTF-8
 * @returns 返回了读取到的内容（异步）
 */
export function readLocal(
  file: File,
  {
    type = readLocal.DataURL,
    encoding = 'UTF-8',
  }: Partial<IReadLocalInit> = {},
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('file not exists'))
    }
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result)
    }
    fr.onerror = error => {
      reject(error)
    }
    new Map()
      .set(ReadType.DataURL, () => fr.readAsDataURL(file))
      .set(ReadType.Text, () => fr.readAsText(file, encoding))
      .set(ReadType.BinaryString, () => fr.readAsBinaryString(file))
      .set(ReadType.ArrayBuffer, () => fr.readAsArrayBuffer(file))
      .get(type)()
  })
}

readLocal.DataURL = ReadType.DataURL
readLocal.Text = ReadType.Text
readLocal.BinaryString = ReadType.BinaryString
readLocal.ArrayBuffer = ReadType.ArrayBuffer
