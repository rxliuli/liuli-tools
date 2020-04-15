import { Logger, logger } from './logger'
import { emptyFunc } from '../function/emptyFunc'

/**
 * @test {logger}
 */
describe('测试 logger', () => {
  it('基本示例', () => {
    expect(logger.log).toBe(console.log)
    logger.enable = false
    expect(logger.log).toBe(emptyFunc)
    logger.enable = true
    expect(logger.log).toBe(console.log)
    expect(logger.info).toBe(console.info)
  })
  it('测试设置日志级别', () => {
    logger.level = Logger.Level.Error
    expect(logger.debug).toBe(emptyFunc)
    expect(logger.log).toBe(emptyFunc)
    expect(logger.info).toBe(emptyFunc)
    expect(logger.warn).toBe(emptyFunc)
    expect(logger.error).toBe(console.error)
  })
})
