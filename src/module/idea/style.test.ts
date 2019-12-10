import { style } from './style'

describe('测试 style 函数', () => {
  it('基本示例', () => {
    const bgColor = '#fff'
    const color = '#000'
    let $body = document.body
    const $style = style($body)!
    $style.color(color)
    $style.backgroundColor(bgColor)
    expect($style.color()).toBe($body.style.color)
    expect($style.backgroundColor()).toBe($body.style.backgroundColor)
  })
})
