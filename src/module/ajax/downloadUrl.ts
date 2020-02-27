/**
 * 根据 url 下载二进制资源
 * @param url 下载请求信息
 * @param filename 下载文件名，没有则默认为链接中的文件名
 */
export async function downloadUrl(
  url: string,
  filename: string = url.substr(url.lastIndexOf('/')),
) {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  // 为 link 赋值
  eleLink.href = url
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}
