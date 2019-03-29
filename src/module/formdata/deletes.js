// @ts-check

/**
 * FormData 批量删除方法
 * @param {FormData} fd FormData 对象
 * @param {Array} keys  删除的 key 列表
 * @returns {FormData} 返回删除后的 FormData 对象
 */
export function deletes (fd, keys) {
  keys.forEach(key => fd.delete(key))
  return fd
}
