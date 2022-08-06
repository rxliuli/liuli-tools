import i18next from 'i18next'

export enum LanguageEnum {
  En = 'en',
  ZhCN = 'zhCN',
}

export class I18nextUtil<
  T extends Record<
    string,
    {
      params: [key: string] | [key: string, params: Record<string, string | number>]
      value: string
    }
  >,
> {
  async changeLang(lang: LanguageEnum): Promise<void> {
    await i18next.changeLanguage(lang)
  }

  /**
   * 加载国际化
   */
  async init(resources: Record<LanguageEnum, Record<string, string>>, language: LanguageEnum): Promise<void> {
    await i18next.init({
      lng: language,
      resources: Object.entries(resources).reduce((res, [k, v]) => {
        Reflect.set(res, k, {
          translation: v,
        })
        return res
      }, {}),
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    })
  }

  /**
   * 根据 key 获取翻译的文本
   * @param args
   */
  t<K extends keyof T>(...args: T[K]['params']): T[K]['value'] {
    return i18next.t(args[0], args[1])
  }
}
