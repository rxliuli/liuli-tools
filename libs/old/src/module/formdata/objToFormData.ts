/**
 * 将参数对象转换为 FormData，只转换一层
 * @param data 参数对象
 * @return {FormData} 转换后的表单对象
 */
export function objToFormData(
  data: Record<string, string | Blob | any>,
): FormData {
  return Object.entries(data).reduce((res, [k, v]) => {
    if (v instanceof Blob) {
      res.append(k, v)
    } else {
      res.append(k, v && v.toString())
    }
    return res
  }, new FormData())
}
