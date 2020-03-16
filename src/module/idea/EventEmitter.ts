type EventType = string | number

export class EventEmitter {
  private readonly events = new Map<EventType, Function[]>()
  constructor() {}

  add(event: EventType, callback: Function) {
    const callbacks = this.events.get(event) || []
    callbacks.push(callback)
    this.events.set(event, callbacks)
    return this
  }

  del(event: EventType, callback: Function) {
    const callbacks = this.events.get(event) || []
    this.events.set(
      event,
      callbacks.filter((fn: any) => fn !== callback),
    )
    return this
  }

  delAll(event: EventType) {
    this.events.delete(event)
    return this
  }

  emit(event: EventType, ...args: any[]) {
    const callbacks = this.events.get(event) || []
    callbacks.forEach(fn => {
      fn(...args)
    })

    return this
  }
  listeners(event: EventType) {
    return this.events.get(event) || []
  }
}
