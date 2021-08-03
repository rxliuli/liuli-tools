import { TranslateTypeConfig } from './Generator'
import { sortBy, uniqueBy } from '@liuli-util/array'
import path from 'path'
import { i18n } from '../constants/I18n'

export interface LocaleJSON {
  path: string
  data: object
}

/**
 * 解析每个 json 文件得到生成类型定义所需的结构
 */
export class Parser {
  constructor(private readonly language: string) {}

  /**
   * 解析带参数的翻译字符串
   * @param str
   * @protected
   */
  protected parseVal(str: string): string[] | null {
    const paramRegExp = new RegExp('{{(.*?)}}', 'g')
    const matchRes = str.match(paramRegExp)
    if (!matchRes) {
      return null
    }
    return matchRes.map((s) => s.substr(2, s.length - 4))
  }

  /**
   * 解析单个配置文件，压平所有的 key
   * @param data
   * @param isDefaultLanguage
   */
  protected parseLocale(
    data: object,
    isDefaultLanguage = false,
  ): TranslateTypeConfig[] {
    return Object.entries(data).flatMap(([k, v]) => {
      if (typeof v !== 'string') {
        throw new Error(i18n.t('generator.error.nestKey'))
      }
      return [
        {
          key: k,
          params: this.parseVal(v) || undefined,
          value: isDefaultLanguage ? v : undefined,
        },
      ]
    })
  }

  parse(locales: LocaleJSON[]): TranslateTypeConfig[] {
    const arr = locales.flatMap((value) =>
      this.parseLocale(
        value.data,
        path.basename(value.path).includes(this.language),
      ),
    )
    return uniqueBy(
      sortBy(arr, (config) =>
        config.value === 'string' || config.value === undefined ? 1 : 0,
      ),
      (config) => config.key,
    )
  }
}
