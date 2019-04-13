import { singleModel } from './singleModel'

/**
 * @test {singleModel}
 */
describe('test singleModel', () => {
  it('test singleModel for no parameter', () => {
    class Demo {}

    const SingleDemo = singleModel(Demo)
    const demo1 = new SingleDemo()
    const demo2 = new SingleDemo()

    expect(demo1).toBe(demo2)
    expect(demo1 === demo2).toBe(true)
  })
  it('test this', function () {
    this.name = 'rx'
    const _this = this
    class Demo {
      name () {
        return _this.name
      }
    }

    const SingleDemo = singleModel(Demo)
    const demo1 = new SingleDemo()
    const demo2 = new SingleDemo()

    expect(demo1).toBe(demo2)
    expect(demo1 === demo2).toBe(true)
    expect(demo1.name()).toBe(this.name)
  })
})
