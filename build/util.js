import path from 'path'

/**
 * 根据相对路径计算真是的路径
 * 从当前类的文件夹开始计算，这里是 /build
 * @param {String} relaPath 相对路径
 * @returns {String} 绝对路径
 */
export function calcPath (relaPath) {
  return path.resolve(__dirname, relaPath)
}
