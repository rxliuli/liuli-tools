/**
 * FormData 批量删除方法
 * @param fd FormData 对象
 * @param keys  删除的 key 列表
 * @returns 返回删除后的 FormData 对象
 */
export function deletes(fd: FormData, keys: string[]): FormData {
  keys.forEach(key => fd.delete(key))
  return fd
}
