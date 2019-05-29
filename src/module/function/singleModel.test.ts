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
  it('test this', function() {
    // @ts-ignore
    this.name = 'rx'
    // @ts-ignore
    const _this = this
    class Demo {
      public name() {
        return _this.name
      }
    }

    const SingleDemo = singleModel(Demo)
    const demo1 = new SingleDemo()
    const demo2 = new SingleDemo()

    expect(demo1).toBe(demo2)
    expect(demo1 === demo2).toBe(true)
    // @ts-ignore
    expect(demo1.name()).toBe(this.name)
  })
})
