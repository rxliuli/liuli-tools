import { expect, it, describe, beforeEach } from 'vitest'
import i18next from 'i18next'
import en from './i18n/en.json'
import zhCN from './i18n/zhCN.json'

// @ts-ignore
import { TranslateParams } from './i18n'

enum LanguageEnum {
  ZH_CN = 'zhCN',
  EN_US = 'en',
}

class I18n {
  /**
   * 加载国际化资源
   */
  async load(lng: string) {
    await i18next.init({
      lng: lng,

      resources: {
        en: {
          translation: en,
        },

        zhCN: {
          translation: zhCN,
        },
      },

      keySeparator: false,
    })
  }

  t(...args: TranslateParams): string {
    return i18next.t(args[0], args[1] as never)
  }
}

const i18n = new I18n()

describe('测试 loadI18n', () => {
  beforeEach(async () => {
    await i18n.load(LanguageEnum.ZH_CN)
  })

  it('基本示例', async () => {
    expect(i18n.t('test.hello')).toBe('你好')
    await i18n.load(LanguageEnum.EN_US)
    expect(i18n.t('test.hello')).toBe('hello')
  })

  it('测试嵌套对象', async () => {
    expect(i18n.t('test.footer.copyright')).toBe('一些版权')
  })

  it('测试存在插值的情况', async () => {
    const res = i18n.t('test.params', {
      what: 'i18next',
      how: 'great',
    } as const)

    expect(res).toBe('是的, i18next 是 great')
  })

  it('测试特殊字符', () => {
    const res = i18n.t('test.special.characters')
    expect(res).toBe('特殊字符')
  })

  /**
   * 由于我禁用了这种情况下生成类型定义，所以无法测试（会引起类型错误）
   */
  it('测试嵌套参数', () => {})

  it('测试包含 :', () => {
    expect(i18n.t('test.Contains a colon:')).toBe('包含冒号:')
  })
})
