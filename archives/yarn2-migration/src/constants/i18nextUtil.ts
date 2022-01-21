import { I18nextUtil, LanguageEnum } from '@liuli-util/i18next-util'
import { osLocale } from 'os-locale'
import { TranslateType } from '../i18n'

export async function getLanguage(): Promise<LanguageEnum> {
  const language = await osLocale()
  /**
   * os-locale => i18next 的语言类型字符串映射
   */
  const map: Record<string, LanguageEnum> = {
    'zh-CN': LanguageEnum.ZhCN,
    'en-US': LanguageEnum.En,
  }
  return map[language] || LanguageEnum.En
}

export const i18nextUtil = new I18nextUtil<TranslateType>()
