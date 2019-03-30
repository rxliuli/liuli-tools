// @ts-check
/**
 * 在浏览器上下载二进制资源
 * @param {Blob} blob 要下载的二进制资源
 * @param {String} filename 文件名
 */
export function download (blob, filename = 'unknown') {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  // 为 link 赋值
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}
