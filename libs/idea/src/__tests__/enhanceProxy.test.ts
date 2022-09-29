import { expect, it, describe } from 'vitest'
import { enhanceProxy, EnhanceProxyHandler } from '../enhanceProxy'

describe('测试 enhanceProxy', () => {
  it('基本示例', () => {
    interface U {
      info: {
        address: {
          city: string
        }
      }
    }

    const handler: EnhanceProxyHandler<object> = {
      get(target: any, path: PropertyKey[]): any {
        if (path.join('.') === 'info.address.city') {
          return '广州'
        }

        return enhanceProxy({}, handler)
      },
    }

    const res = enhanceProxy<U>({} as any, handler)
    expect(res.info.address.city).toBe('广州')
    expect(() => console.log(res.info.toString())).toThrowError()
  })
})
