/**
 * FormData 批量删除方法
 * @param keys {Array} 删除的 key 列表
 * @returns {FormData} this
 */
function deletes(formData, keys) {
  keys.forEach(key => formData.delete(key))
  return formData
}

export default deletes
