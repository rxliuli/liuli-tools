/**
 * 转换 npm 包名为一个合适的全局变量名
 * @param name
 */
export function getPkgGlobalName(name: string): string {
  const temp = name.startsWith('@') ? name.slice(name.indexOf('/') + 1) : name
  return temp
    .split('-')
    .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
    .join('')
}
