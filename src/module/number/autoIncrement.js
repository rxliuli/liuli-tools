// @ts-check

function * autoIncrementGenerator () {
  for (let i = 0; ; i++) {
    yield i
  }
}

const generator = autoIncrementGenerator()
/**
 * 获取自增长序列的最新值
 * @returns {Number} 最新值
 */
export function autoIncrement () {
  return generator.next().value
}
