import { compatibleAsync } from './compatibleAsync'

type NoParamVoidFunc = () => void | PromiseLike<void>

/**
 * 一个简单的微任务队列辅助类，使用（宏）命令模式实现
 * 注：该 class 是为了解决问题 https://segmentfault.com/q/1010000019115775
 */
export class MicrotaskQueue {
  // task 列表
  public tasks: NoParamVoidFunc[] = []
  // 当前是否存在正在执行的 task
  private lock = false
  add(func: NoParamVoidFunc) {
    this.tasks.push(func)
    this.execute()
    return this
  }
  execute() {
    if (this.lock) {
      return
    }
    this.lock = true
    const goNext = () => {
      if (this.tasks.length) {
        const task = this.tasks.shift()!
        compatibleAsync(task(), () => goNext())
      } else {
        this.lock = false
      }
    }
    Promise.resolve().then(goNext)
  }
}
