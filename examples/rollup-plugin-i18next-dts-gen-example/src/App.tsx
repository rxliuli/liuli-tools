import React, { useEffect, useState } from 'react'
import { useAsyncFn, useLocalStorage, useMount } from 'react-use'
import { getLanguage, i18n, LanguageEnum } from './constants/i18n'
import enUS from './i18n/en-US.json'
import zhCN from './i18n/zh-CN.json'

function App() {
  const [language, setLanguage] = useLocalStorage<LanguageEnum>('language', getLanguage())
  const [key, setKey] = useState(0)
  const [, fetch] = useAsyncFn(async (language: LanguageEnum) => {
    await i18n.init(
      {
        [LanguageEnum.EnUS]: enUS,
        [LanguageEnum.ZhCN]: zhCN,
      },
      language,
    )
    setKey(key + 1)
  }, [])
  useMount(() => fetch(language!))

  function onChangeLanguage(ev: React.ChangeEvent<HTMLSelectElement>) {
    const language = ev.target.value as LanguageEnum
    console.log('onChangeLanguage: ', language)
    setLanguage(language)
    fetch(language)
  }

  return (
    <div key={key}>
      <h2>{i18n.t('hello')}</h2>
      <div>
        <label>{i18n.t('toggle')}</label>
        <select value={language} onChange={onChangeLanguage}>
          <option value={LanguageEnum.EnUS}>English</option>
          <option value={LanguageEnum.ZhCN}>简体中文</option>
        </select>
      </div>
    </div>
  )
}

export default App
