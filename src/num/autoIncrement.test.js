const rxnum = require('../num')

test('测试自增序列', () => {
  for (let i = 0; i < 100; i++) {
    console.log(rxnum.autoIncrement())
  }
})
