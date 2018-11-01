const rxnum = require('../num')
/**
 * 默认的获取到元素唯一标识的字符串
 * 注意：Symbol 是非常特殊的类型，Symbol 类型的对象全部默认都是唯一的，即便它们真的是同一个
 * @param {Object} item 要生成唯一标识字符串的对象
 * @returns 唯一标识的字符串
 */
module.exports = function defaultUniqueFn(item) {
  const type = typeof item
  if (type === 'symbol') {
    return 'symbol' + rxnum.autoIncrement()
  }
  return type + item
}
