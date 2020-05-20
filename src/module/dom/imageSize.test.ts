import { imageSize, RectSize } from './imageSize'

describe.skip('测试 imageSize', () => {
  it('基本示例', async () => {
    const size = await imageSize('https://i.picsum.photos/id/758/500/400.jpg')
    expect(size).toEqual({
      width: 500,
      height: 400,
    } as RectSize)
  }, 10000)
})
