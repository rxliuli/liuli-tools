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
interface IReadLocalInit<T extends ReadType> {
  type: T
  encoding: string
}
type ReadResult<T extends ReadType> = T extends ReadType.DataURL | ReadType.Text
  ? string
  : ArrayBuffer

/**
 * 读取本地浏览器选择的文件
 * @param file 选择的文件
 * @param options 读取的选项
 * @returns 返回了读取到的内容（异步）
 */
export function _readLocal<T extends ReadType>(
  file: File,
  options: Partial<{
    type: T
    encoding: string
  }> = {},
): Promise<ReadResult<T> | null> {
  const { type, encoding } = Object.assign(
    {
      type: ReadType.DataURL,
      encoding: 'UTF-8',
    },
    options,
  )
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('file not exists'))
    }
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result as ReadResult<T>)
    }
    fr.onerror = error => {
      reject(error)
    }
    switch (type) {
      case ReadType.DataURL:
        fr.readAsDataURL(file)
        break
      case ReadType.Text:
        fr.readAsText(file, encoding)
        break
      case ReadType.BinaryString:
        fr.readAsBinaryString(file)
        break
      case ReadType.ArrayBuffer:
        fr.readAsArrayBuffer(file)
        break
    }
  })
}

export const readLocal = Object.assign(_readLocal, {
  ReadType,
  /**
   * 以 data url 读取
   * @deprecated 已废弃，请使用枚举类 ReadType
   */
  DataURL: ReadType.DataURL,
  /**
   * 以文本读取
   * @deprecated 已废弃，请使用枚举类 ReadType
   */
  Text: ReadType.Text,
  /**
   * 以二进制文件读取
   * @deprecated 已废弃，请使用枚举类 ReadType
   */
  BinaryString: ReadType.BinaryString,
  /**
   * 以 ArrayBuffer 读取
   * @deprecated 已废弃，请使用枚举类 ReadType
   */
  ArrayBuffer: ReadType.ArrayBuffer,
})
