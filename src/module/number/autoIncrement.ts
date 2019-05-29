/**
 * 使用 Generator 实现一个从 0 开始的无限自增序列
 */
function* autoIncrementGenerator(): Generator {
  for (let i = 0; ; i++) {
    /**
     * @returns 每次获取都返回循环中的当前迭代变量，然后暂停于此处
     */
    yield i
  }
}

/**
 * 生成器对象
 */
const generator = autoIncrementGenerator()

/**
 * 获取自增长序列的最新值
 * @returns 最新值
 */
export function autoIncrement(): number {
  return generator.next().value
}
