/**
 * 加载一个远程样式文件
 * @param href 远程 CSS 样式路径
 * @returns 等待异步加载样式完成
 */
export function loadStyle(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.addEventListener('load', () => resolve())
    link.addEventListener('error', reject)
    document.body.appendChild(link)
  })
}
