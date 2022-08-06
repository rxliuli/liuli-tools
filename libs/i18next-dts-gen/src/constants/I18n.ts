// @ts-ignore
import { TranslateType } from '../i18n'
import { I18nextUtil, LanguageEnum } from '../util/I18nextUtil'

export async function getLanguage(): Promise<LanguageEnum> {
  const language = Intl.DateTimeFormat().resolvedOptions().locale
  /**
   * locale => i18next 的语言类型字符串映射
   */
  const map: Record<string, LanguageEnum> = {
    'zh-CN': LanguageEnum.ZhCN,
    'en-US': LanguageEnum.En,
  }
  return map[language] || LanguageEnum.En
}

export const i18n = new I18nextUtil<TranslateType>()
