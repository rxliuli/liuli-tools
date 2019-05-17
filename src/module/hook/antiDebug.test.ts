import { antiDebug } from './antiDebug'
import { wait } from '../function/wait'

/**
 * @test {antiDebug}
 */
describe('test antiDebug', () => {
  const { cyclingDebugger, checkDebug, disableConsoleOutput } = antiDebug
  it('test cyclingDebugger', () => {
    cyclingDebugger()
  })
  it.skip('test checkDebug', async () => {
    checkDebug(() => console.log('正在 debug?'))
    await wait(1000)
    function sleep (milliSeconds) {
      const end = Date.now() + milliSeconds
      while (Date.now() < end) {}
    }
    sleep(3000)
  })
  it('test disableConsoleOutput', () => {
    // 未禁用之前应该可以在控制台打印了 abc
    console.log('abc')
    disableConsoleOutput()
    // 仅用了之后就看不到了
    console.log('abc')
  })
})
