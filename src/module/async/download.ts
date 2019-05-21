/**
 * 在浏览器上下载二进制资源
 * @param blob 要下载的二进制资源
 * @param filename 文件名
 */
export function download(blob: Blob, filename = 'unknown') {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a')
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
