import { toggleClass } from './toggleClass'

/**
 * @test {toggleClass}
 */
describe('test toggleClass', () => {
  it('simple example', () => {
    document.body.innerHTML = `<style>
  .red {
    color: red;
  }

  .blue {
    color: blue;
  }
</style>
<h1 id="hello" class="red"></h1>
`
    const $hello: Element = document.querySelector('#hello')!
    const toggle = toggleClass($hello!, {
      1: 'red',
      2: 'blue',
    })
    toggle(1)
    expect(window.getComputedStyle($hello).color).toBe('red')
    toggle(2)
    expect(window.getComputedStyle($hello).color).toBe('blue')
  })
})
