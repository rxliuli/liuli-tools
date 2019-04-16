// @ts-check
import { onec } from './../function/onec'
/**
 * 使用 Generator 实现一个从 0 开始的自增序列
 */
function * autoIncrementGenerator () {
  for (let i = 0; ; i++) {
    /**
     * @returns {Number} 每次获取都返回循环中的当前迭代变量，然后暂停于此处
     */
    yield i
  }
}
/**
 * 包装 {@link autoIncrementGenerator} 为只能调用一次的函数
 */
const generator = onec(autoIncrementGenerator)

/**
 * 获取自增长序列的最新值
 * @returns {Number} 最新值
 */
export function autoIncrement () {
  return generator().next().value
}
