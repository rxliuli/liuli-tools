/**
 * 加载一个远程脚本文件
 * @param src 远程脚本路径
 * @returns 等待异步加载脚本完成
 */
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = false
    script.src = src
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', reject)
    document.body.appendChild(script)
  })
}
