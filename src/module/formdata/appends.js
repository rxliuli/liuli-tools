// @ts-check

/**
 * FormData 批量添加方法
 * 注：该方法不会覆盖掉原本的属性
 * @param {FormData} fd FormData 对象
 * @param {Object} obj 键值对对象
 * @returns {FormData} 添加完成后的 FormData 对象
 */
export function appends (fd, obj) {
  for (const key in obj) {
    fd.append(key, obj[key])
  }
  return fd
}
