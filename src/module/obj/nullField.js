import blankToNullField from './blankToNullField'

/**
 * 置空对象所有空白的属性
 * 该函数仅为兼容性而保留
 * @param {Object} obj 对象
 * @returns {Object} 将所有的空白属性全部转换为 null 的新对象
 * @deprecated 已废弃，请使用可读性更好的 {@override blankToNullField} 代替
 */
export default function nullField (obj) {
  return blankToNullField(obj)
}
