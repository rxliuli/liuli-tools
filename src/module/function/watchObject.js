// @ts-check
/**
 * 定义监听对象时的回调函数 doc
 * @callback WatchObjectCallback
 * @param {Object} target 代理的对象变化后的值
 * @param {String} k 变化的属性名
 * @param {Object} v 变化的属性值
 */

/**
 * 深度监听指定对象属性的变化
 * 注：指定对象不能是原始类型，即不可变类型，而且对象本身的引用不能改变，最好使用 const 进行声明
 * @param {Object} object 需要监视的对象
 * @param {WatchObjectCallback} callback 当代理对象发生改变时的回调函数，回调函数有三个参数，分别是
 * @returns {Object} 返回源对象的一个代理
 */
export function watchObject (object, callback) {
  const handler = {
    get (target, property, receiver) {
      try {
        return new Proxy(target[property], handler)
      } catch (err) {
        return Reflect.get(target, property, receiver)
      }
    },
    set (target, key, value, receiver) {
      callback(target, key, value)
      return Reflect.set(target, key, value, receiver)
    }
  }
  return new Proxy(object, handler)
}
