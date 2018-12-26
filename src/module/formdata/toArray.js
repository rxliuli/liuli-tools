/**
 * FormData 添加转换为包含所有键值对 Array 的方法
 * FormData.key => Array.item.key: 每一项元素中的 key 是 FormData 中包含的属性的名称
 * FormData.value => Array.item.value: 每一项元素中的 value 是 FormData 中包含的属性的值
 * @param {FormData} formData 需要转换的 FormData 对象
 * @returns {Array} 转换后的数组
 */
function toArray(formData) {
  return Array.asIterator(formData.keys())
}

export default toArray
