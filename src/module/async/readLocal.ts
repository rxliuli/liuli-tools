/**
 * 读取文件类型
 */
enum ReadType {
  /**
   * 以 data url 读取
   */
  DataURL = 'readAsDataURL',
  /**
   * 以文本读取
   */
  Text = 'readAsText',
  /**
   * 以二进制文件读取
   */
  BinaryString = 'readAsBinaryString',
  /**
   * 以 ArrayBuffer 读取
   */
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
 * @param option.type 读取的类型，默认按照二进制 url 读取
 * @param option.encoding 读取的编码格式，默认为 UTF-8
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

/**
 * 以 data url 读取
 * @deprecated 已废弃，请使用枚举类 ReadType
 */
readLocal.DataURL = ReadType.DataURL
/**
 * 以文本读取
 * @deprecated 已废弃，请使用枚举类 ReadType
 */
readLocal.Text = ReadType.Text
/**
 * 以二进制文件读取
 * @deprecated 已废弃，请使用枚举类 ReadType
 */
readLocal.BinaryString = ReadType.BinaryString
/**
 * 以 ArrayBuffer 读取
 * @deprecated 已废弃，请使用枚举类 ReadType
 */
readLocal.ArrayBuffer = ReadType.ArrayBuffer
