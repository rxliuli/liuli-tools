import { AntiDebug } from './AntiDebug'
import { wait } from '../async/wait'

/**
 * @test {antiDebug}
 */
describe('test antiDebug', () => {
  it('test cyclingDebugger', () => {
    AntiDebug.cyclingDebugger()
  })
  it.skip('test checkDebug', async () => {
    AntiDebug.checkDebug(() => console.log('正在 debug?'))
    await wait(1000)
    function sleep(milliSeconds: number) {
      const end = Date.now() + milliSeconds
      while (Date.now() < end) {}
    }
    sleep(3000)
  })
  it('test disableConsoleOutput', () => {
    // 未禁用之前应该可以在控制台打印了 abc
    console.log('abc')
    AntiDebug.disableConsoleOutput()
    // 仅用了之后就看不到了
    console.log('abc')
  })
})
