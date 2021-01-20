/**
 * 一般的 mime 类型，用到再加
 * @link https://wiki.developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export enum BasicMemeTypeEnum {
  Xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Zip = 'application/zip',
  Pdf = 'application/pdf',
}

/**
 * 二进制相关工具类
 */
export class BinaryUtil {
  /**
   * 转换 data url 为 blob 对象
   * @param dataURI
   * @ref https://stackoverflow.com/a/7261048
   */
  static dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], { type: mimeString })
  }

  /**
   * 转换 Blob 为 File
   * @param blob
   * @param fileName 文件名
   * @ref https://stackoverflow.com/a/29390393
   */
  static blobToFile(blob: Blob, fileName: string): File {
    const b: any = blob
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date()
    b.name = fileName

    //Cast to a File() type
    return blob as File
  }

  /**
   * 转换 arraybuffer 为 blob 对象
   * @param buffer
   * @param options
   */
  static arrayBufferToBlob(
    buffer: ArrayBuffer,
    options?: Omit<BlobPropertyBag, 'type'> & { type: BasicMemeTypeEnum },
  ): Blob {
    return new Blob([new Uint8Array(buffer).buffer], options)
  }

  private static readonly chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  private static readonly lookup = BinaryUtil.initLookup()

  private static initLookup() {
    const lookup = new Uint8Array(256)
    for (let i = 0; i < BinaryUtil.chars.length; i++) {
      lookup[BinaryUtil.chars.charCodeAt(i)] = i
    }
    return lookup
  }

  /**
   * 转换 arrayBuffer 为 base64
   * copy as by base64-arraybuffer
   * @link https://github.com/niklasvh/base64-arraybuffer/blob/master/lib/base64-arraybuffer.js
   */
  static arrayBufferToBase64(arraybuffer: ArrayBuffer): string {
    let bytes = new Uint8Array(arraybuffer),
      i,
      len = bytes.length,
      base64 = ''

    for (i = 0; i < len; i += 3) {
      base64 += BinaryUtil.chars[bytes[i] >> 2]
      base64 += BinaryUtil.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
      base64 +=
        BinaryUtil.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
      base64 += BinaryUtil.chars[bytes[i + 2] & 63]
    }

    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + '='
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + '=='
    }

    return base64
  }

  /**
   * 转换 base64 为 arrayBuffer
   * copy as by base64-arraybuffer
   * @link https://github.com/niklasvh/base64-arraybuffer/blob/master/lib/base64-arraybuffer.js
   */
  static base64ToArrayBuffer(base64: string): ArrayBuffer {
    let bufferLength = base64.length * 0.75
    const len = base64.length
    let i,
      p = 0,
      encoded1,
      encoded2,
      encoded3,
      encoded4

    if (base64[base64.length - 1] === '=') {
      bufferLength--
      if (base64[base64.length - 2] === '=') {
        bufferLength--
      }
    }

    const arraybuffer = new ArrayBuffer(bufferLength),
      bytes = new Uint8Array(arraybuffer)

    for (i = 0; i < len; i += 4) {
      encoded1 = BinaryUtil.lookup[base64.charCodeAt(i)]
      encoded2 = BinaryUtil.lookup[base64.charCodeAt(i + 1)]
      encoded3 = BinaryUtil.lookup[base64.charCodeAt(i + 2)]
      encoded4 = BinaryUtil.lookup[base64.charCodeAt(i + 3)]

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
    }

    return arraybuffer
  }

  /**
   * arrayBuffer 转 JSON
   */
  static arrayBufferToJson(ArrayBuffer: ArrayBuffer): Promise<Object> {
    return new Promise((resolve) => {
      const blob = new Blob([ArrayBuffer as any])
      const reader = new FileReader()
      reader.readAsText(blob, 'utf-8')
      reader.onload = function () {
        resolve(JSON.parse(reader.result as any))
      }
    })
  }

  /**
   * @deprecated 已废弃，请使用小谢驼峰的 arrayBufferToJson
   */
  static ArrayBufferToJson = BinaryUtil.arrayBufferToJson
}
