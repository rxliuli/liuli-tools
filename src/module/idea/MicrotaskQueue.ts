import { insert } from '../array/insert'
import { compatibleAsync } from '../async/compatibleAsync'

type NoParamVoidFunc = () => void | PromiseLike<void>

/**
 * 一个简单的微任务队列辅助类
 * 注：该 class 是为了解决问题 https://segmentfault.com/q/1010000019115775
 */
export class MicrotaskQueue {
  public tasks: NoParamVoidFunc[] = []
  private isRunning = false
  add(func: NoParamVoidFunc, index?: number) {
    if (index !== undefined) {
      insert(this.tasks, index, func)
    } else {
      this.tasks.push(func)
    }
    this.start()
    return this
  }
  private start() {
    if (this.isRunning) {
      return
    }
    this.isRunning = true
    const goNext = () => {
      if (this.tasks.length) {
        const task = this.tasks.shift()!
        compatibleAsync(task(), () => goNext())
      } else {
        this.isRunning = false
      }
    }
    Promise.resolve().then(() => {
      goNext()
    })
  }
}
