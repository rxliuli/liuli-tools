import { lastFocus } from './lastFocus'

/**
 * @test {lastFocus}
 */
describe('test lastFocus', () => {
  document.body.innerHTML = /* html */ `
    <main>
      <input type="text" id="name" />
      <a href="https://blog.rxliuli.com" id="link" />
    </main>
    `
  it('test lastFocus for input focus', () => {
    // @ts-ignore
    const $name: HTMLFormElement = document.querySelector('#name')
    $name.focus()
    expect(lastFocus()).toEqual($name)
  })
  it('test lastFocus for input blur', () => {
    // @ts-ignore
    const $name: HTMLFormElement = document.querySelector('#name')
    $name.focus()
    expect(lastFocus()).toEqual($name)
    $name.blur()
    expect(lastFocus()).toBeNull()
  })
  it('test lastFocus for a tag', () => {
    // @ts-ignore
    const $link: any = document.querySelector('#link')
    $link.focus()
    expect(lastFocus()).toEqual($link)
    $link.blur()
    expect(lastFocus()).toBeNull()
  })
})
