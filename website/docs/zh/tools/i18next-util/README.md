# @liuli-util/i18next-util

## 简介

对 i18next 的简单封装，用于结合 [i18next-dts-gen](../i18next-dts-gen/README.md) 一起使用提供简单国际化的开发体验。

## 使用

创建全局变量

```ts
// constants/i18n.ts
import { I18n } from 'libs/i18next-util/dist/index'
import { TranslateParams } from '../i18n'

export const i18n = new I18n<TranslateParams>()
```

下面是在 nodejs 中使用

```ts
// src/bin.ts
async function getLanguage() {
  const language = await osLocale()
  const map: Record<string, LanguageEnum> = {
    'zh-CN': LanguageEnum.ZhCN,
    'en-US': LanguageEnum.EnUS,
  }
  return map[language] || LanguageEnum.EnUS
}

async function main() {
  await i18n.load(await getLanguage())
  console.log(i18n.t('hello', { name: 'liuli' }))
}
```

或者在浏览器中

```ts
// src/App.tsx
function getLanguage() {
  return navigator.language.startsWith('zh')
    ? LanguageEnum.ZhCN
    : LanguageEnum.En
}

export const App: React.FC<AppProps> = () => {
  useMount(async () => {
    await i18n.init({ en, zhCN }, getLanguage())
    // 然后再做其它的事情
  })

  return <div />
}
```
