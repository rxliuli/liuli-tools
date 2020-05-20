/**
 * 矩形大小
 */
interface RectSize {
  width: number
  height: number
}

/**
 * 获取图片的尺寸
 * @param url
 */
export function imageSize(url: string) {
  return new Promise<RectSize>((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', function() {
      resolve({
        width: this.width,
        height: this.height,
      })
    })
    image.addEventListener('error', ev => {
      reject(ev.error)
    })
    image.src = url
  })
}
