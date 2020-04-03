import { readLocal } from './readLocal'
import mock = jest.mock
import { strToBlob } from './strToBlob'

describe('测试 readLocal', () => {
  it('基本示例', async () => {
    const str = '测试文本'
    const file = new File([strToBlob(str)], '文本.md')
    const text = await readLocal(file, {
      type: readLocal.ReadType.Text,
    })
    expect(text).toBe(str)
  })
})
