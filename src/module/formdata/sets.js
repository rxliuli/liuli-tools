// @ts-check
/**
 * FormData 批量设置方法
 * 注：该方法会覆盖掉原本的属性
 * @param {FormData} fd 表单对象
 * @param {Object} obj 键值对对象
 * @returns {FormData} 设置完成后的 FormData 对象
 */
export function sets (fd, obj) {
  for (const k in obj) {
    fd.set(k, obj[k])
  }
  return fd
}
