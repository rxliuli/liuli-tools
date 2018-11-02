/**
 * 一个自动增长的 Number 序列，从 1 开始
 */
export default (() => {
  function* gennerateId() {
    let i = 1
    for (;;) {
      yield i++
    }
  }
  const generatorId = gennerateId()
  return function() {
    return generatorId.next().value
  }
})()
