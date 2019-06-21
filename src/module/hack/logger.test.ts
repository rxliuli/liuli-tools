import { logger } from './logger'
import { emptyFunc } from '../function/emptyFunc'

/**
 * @test {logger}
 */
describe('test logger', () => {
  it('simple example', () => {
    expect(logger.log).toBe(console.log)
    logger.enable = false
    expect(logger.log).toBe(emptyFunc)
    logger.enable = true
    expect(logger.log).toBe(console.log)
    expect(logger.info).toBe(console.info)
  })
})
