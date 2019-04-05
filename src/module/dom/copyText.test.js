import { copyText } from './copyText'
import puppeteer from 'puppeteer'

/**
 * @test {copyText}
 */
describe('test copyText', () => {
  it('test copyText for simple', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const result = await page.evaluate(copyText => {
      // eslint-disable-next-line no-eval
      eval(copyText)
      return copyText('test')
    }, copyText.toString())

    await browser.close()

    expect(result).toBe(true)
  })
})
