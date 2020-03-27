enum ActionEnum {
  Filter,
  Map,
}

interface Task {
  type: ActionEnum
  action: Function
}

class Stream<T> {
  private taskList: Task[] = []
  constructor(private arr: T[]) {}

  filter(fn: (val: T) => boolean) {
    this.taskList.push({
      type: ActionEnum.Filter,
      action: fn,
    })
    return this
  }
  map<U>(fn: (val: T) => U) {
    this.taskList.push({
      type: ActionEnum.Map,
      action: fn,
    })
    const stream = new Stream<U>(this.arr as any)
    stream.taskList = this.taskList
    return stream
  }
  value() {
    return this.arr.reduce((res, v) => {
      let temp = v
      for (const task of this.taskList) {
        if (task.type === ActionEnum.Filter && !task.action(temp)) {
          return res
        } else if (task.type === ActionEnum.Map) {
          temp = task.action(temp)
        }
      }
      res.push(temp)
      return res
    }, [] as T[])
  }
}
/**
 * 将一个数组变成一个流，所有关于流的操作都是延迟的
 */
export function stream<T>(arr: T[]) {
  return new Stream(arr)
}
