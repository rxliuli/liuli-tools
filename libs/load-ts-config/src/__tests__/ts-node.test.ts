import * as ts from 'ts-node'

it('测试 ts-node', () => {
  ts.register().compile('let i = 0', './out.js')
})
