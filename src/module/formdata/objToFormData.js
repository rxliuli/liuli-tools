// @ts-check

/**
 * 将参数对象转换为 FormData，只转换一层
 * @param data 参数对象
 * @return {FormData} 转换后的表单对象
 */
export function objToFormData (data) {
  const fd = new FormData()
  if (data) {
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        const v = data[k]
        fd.append(k, v)
      }
    }
  }
  return fd
}
