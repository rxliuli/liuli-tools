/**
 * 读取文件类型
 */
export enum ReadLocalTypeEnum {
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

type ReadResult<T extends ReadLocalTypeEnum> = T extends
  | ReadLocalTypeEnum.DataURL
  | ReadLocalTypeEnum.Text
  ? string
  : ArrayBuffer

/**
 * 读取本地浏览器选择的文件
 * @param file 选择的文件
 * @param options 读取的选项
 * @returns 返回了读取到的内容（异步）
 */
export function readLocal<T extends ReadLocalTypeEnum>(
  file: File,
  options: Partial<{
    type: T
    encoding: string
  }> = {},
): Promise<ReadResult<T> | null> {
  const { type, encoding } = Object.assign(
    {
      type: ReadLocalTypeEnum.DataURL,
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
    fr.onerror = (error) => {
      reject(error)
    }
    switch (type) {
      case ReadLocalTypeEnum.DataURL:
        fr.readAsDataURL(file)
        break
      case ReadLocalTypeEnum.Text:
        fr.readAsText(file, encoding)
        break
      case ReadLocalTypeEnum.BinaryString:
        fr.readAsBinaryString(file)
        break
      case ReadLocalTypeEnum.ArrayBuffer:
        fr.readAsArrayBuffer(file)
        break
    }
  })
}
