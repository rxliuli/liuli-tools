import { safeExec } from '../function/safeExec'

class WebStorage implements Storage {
  constructor(private storage: Storage) {}

  get length() {
    return this.storage.length
  }

  clear = (): void => {
    this.storage.clear()
  }

  getItem = (key: string): string | null => this.storage.getItem(key)

  key = (index: number): string | null => this.storage.key(index)

  removeItem = (key: string): void => {
    this.storage.removeItem(key)
  }

  setItem = (key: string, value: string): void => {
    this.storage.setItem(key, value)
  }
}

type Null<T> = {
  [P in keyof T]: T[P] | null
}

/**
 * 代理 Storage 使之更简单易用
 * @param storage
 */
export function proxyStorage<T extends object>(
  storage: Storage,
): Storage & Null<T> {
  const kSet = new Set([
    'storage',
    'length',
    'clear',
    'getItem',
    'setItem',
    'removeItem',
    'key',
  ] as (keyof Storage)[])
  return new Proxy(new WebStorage(storage), {
    get(target: Storage, p: string, receiver: any): any {
      if (kSet.has(p)) {
        return Reflect.get(target, p, receiver)
      }
      return safeExec(() => JSON.parse(target.getItem(p.toString())!), null)
    },
    set(target: Storage, p: string, value: any, receiver: any): boolean {
      if (kSet.has(p as any)) {
        return Reflect.set(target, p, receiver)
      }
      target.setItem(
        p.toString(),
        value !== undefined && value !== null ? JSON.stringify(value) : value,
      )
      return true
    },
  }) as any
}
