// ref: https://www.techonthenet.com/js/language_tags.php
export type Lang =
  | 'ar-SA'
  | 'bn-BD'
  | 'bn-IN'
  | 'cs-CZ'
  | 'da-DK'
  | 'de-AT'
  | 'de-CH'
  | 'de-DE'
  | 'el-GR'
  | 'en-AU'
  | 'en-CA'
  | 'en-GB'
  | 'en-IE'
  | 'en-IN'
  | 'en-NZ'
  | 'en-US'
  | 'en-ZA'
  | 'es-AR'
  | 'es-CL'
  | 'es-CO'
  | 'es-ES'
  | 'es-MX'
  | 'es-US'
  | 'fi-FI'
  | 'fr-BE'
  | 'fr-CA'
  | 'fr-CH'
  | 'fr-FR'
  | 'he-IL'
  | 'hi-IN'
  | 'hu-HU'
  | 'id-ID'
  | 'it-CH'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'nl-BE'
  | 'nl-NL'
  | 'no-NO'
  | 'pl-PL'
  | 'pt-BR'
  | 'pt-PT'
  | 'ro-RO'
  | 'ru-RU'
  | 'sk-SK'
  | 'sv-SE'
  | 'ta-IN'
  | 'ta-LK'
  | 'th-TH'
  | 'tr-TR'
  | 'zh-CN'
  | 'zh-HK'
  | 'zh-TW'

export const langList: { value: Lang; label: string }[] = [
  {
    value: 'ar-SA',
    label: 'العربية (المملكة العربية السعودية)',
  },
  {
    value: 'bn-BD',
    label: 'বাংলা (বাংলাদেশ)',
  },
  {
    value: 'bn-IN',
    label: 'বাংলা (ভারত)',
  },
  {
    value: 'cs-CZ',
    label: 'čeština (Česká republika)',
  },
  {
    value: 'da-DK',
    label: 'dansk (Danmark)',
  },
  {
    value: 'de-AT',
    label: 'Österreichisches Deutsch',
  },
  {
    value: 'de-CH',
    label: 'Schweizer Hochdeutsch',
  },
  {
    value: 'de-DE',
    label: 'Standarddeutsch (wie es in Deutschland gesprochen wird)',
  },
  {
    value: 'el-GR',
    label: 'Νέα Ελληνικά (Ελλάδα)',
  },
  {
    value: 'en-AU',
    label: 'Australian English',
  },
  {
    value: 'en-CA',
    label: 'Canadian English',
  },
  {
    value: 'en-GB',
    label: 'British English',
  },
  {
    value: 'en-IE',
    label: 'Irish English',
  },
  {
    value: 'en-IN',
    label: 'Indian English',
  },
  {
    value: 'en-NZ',
    label: 'New Zealand English',
  },
  {
    value: 'en-US',
    label: 'English',
  },
  {
    value: 'en-ZA',
    label: 'English (South Africa)',
  },
  {
    value: 'es-AR',
    label: 'Español de Argentina',
  },
  {
    value: 'es-CL',
    label: 'Español de Chile',
  },
  {
    value: 'es-CO',
    label: 'Español de Colombia',
  },
  {
    value: 'es-ES',
    label: 'Español de España',
  },
  {
    value: 'es-MX',
    label: 'Español de México',
  },
  {
    value: 'es-US',
    label: 'Español de Estados Unidos',
  },
  {
    value: 'fi-FI',
    label: 'Suomi (Suomi)',
  },
  {
    value: 'fr-BE',
    label: 'français de Belgique',
  },
  {
    value: 'fr-CA',
    label: 'français canadien',
  },
  {
    value: 'fr-CH',
    label: 'français suisse',
  },
  {
    value: 'fr-FR',
    label: 'français standard (surtout en France)',
  },
  {
    value: 'he-IL',
    label: 'עברית (ישראל)',
  },
  {
    value: 'hi-IN',
    label: 'हिन्दी (भारत)',
  },
  {
    value: 'hu-HU',
    label: 'Magyar (Magyarország)',
  },
  {
    value: 'id-ID',
    label: 'Bahasa Indonesia (Indonesia)',
  },
  {
    value: 'it-CH',
    label: 'Italiano svizzero',
  },
  {
    value: 'it-IT',
    label: 'Italiano standard (come si parla in Italia)',
  },
  {
    value: 'ja-JP',
    label: '日本語 (日本)',
  },
  {
    value: 'ko-KR',
    label: '한국어 (대한민국)',
  },
  {
    value: 'nl-BE',
    label: 'Nederlands van België',
  },
  {
    value: 'nl-NL',
    label: 'Standaard Nederlands (zoals gesproken in Nederland)',
  },
  {
    value: 'no-NO',
    label: 'Norsk (Norge)',
  },
  {
    value: 'pl-PL',
    label: 'Polski (Polska)',
  },
  {
    value: 'pt-BR',
    label: 'Português do Brasil',
  },
  {
    value: 'pt-PT',
    label: 'Português europeu (como escrito e falado em Portugal)',
  },
  {
    value: 'ro-RO',
    label: 'Română (România)',
  },
  {
    value: 'ru-RU',
    label: 'Русский (Россия)',
  },
  {
    value: 'sk-SK',
    label: 'Slovenčina (Slovenská republika)',
  },
  {
    value: 'sv-SE',
    label: 'Svenska (Sverige)',
  },
  {
    value: 'ta-IN',
    label: 'தமிழ் (இந்தியா)',
  },
  {
    value: 'ta-LK',
    label: 'தமிழ் (இலங்கை)',
  },
  {
    value: 'th-TH',
    label: 'ไทย (ประเทศไทย)',
  },
  {
    value: 'tr-TR',
    label: 'Türkçe (Türkiye)',
  },
  {
    value: 'zh-CN',
    label: '简体中文（中国大陆）',
  },
  {
    value: 'zh-HK',
    label: '繁體中文（香港特別行政區）',
  },
  {
    value: 'zh-TW',
    label: '繁體中文（台灣）',
  },
]
