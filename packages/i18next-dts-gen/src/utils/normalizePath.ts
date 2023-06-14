/**
 * 标准化路径
 * @param path
 */
export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/')
}
