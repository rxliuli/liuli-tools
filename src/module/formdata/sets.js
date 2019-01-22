/**
 * FormData 批量设置方法
 * 注：该方法会覆盖掉原本的属性
 * @param {Object} obj 键值对对象
 * @returns {FormData} 设置完成后的 FormData 对象
 */
function sets (obj) {
  for (const key in obj) {
    this.set(key, obj[key])
  }
  return this
}

export default sets
