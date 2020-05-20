import { imageSize } from './imageSize'

describe.skip('测试 imageSize', () => {
  it('基本示例', async () => {
    const size = await imageSize('https://i.picsum.photos/id/758/500/400.jpg')
    expect(size.width).toBe(500)
    expect(size.width).toBe(400)
  })
})
