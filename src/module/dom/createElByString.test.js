import { createElByString } from './createElByString'
/**
 * @test {createElByString}
 */
describe('test createElByString', () => {
  it('test normal situation', () => {
    document.body.innerHTML = /* html */ `
    <main>
    </main>
    `
    const $name = createElByString(`<input type="text" id="name" />`)
    const $main = document.querySelector('main')
    $main.append($name)
    expect($main.querySelector('#name')).toEqual($name)
  })
})
