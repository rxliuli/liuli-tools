# 为 i18next json 配置文件生成 dts 类型定义

## 场景

吾辈有一些项目需要使用 i18next 来处理国际化，但是使用 typescript 需要有类型定义，所以之前在 [joplin-utils](https://github.com/rxliuli/joplin-utils) 项目中维护和使用。昨天做了很多重构，现在已经分离出来并作为公共 npm 包发布。如果有人感兴趣，可以尝试一下。

> [English](https://liuli-tools.rxliuli.com/tools/i18next-dts-gen/), [简体中文](https://liuli-tools.rxliuli.com/zh/tools/i18next-dts-gen/)

## 简介

i18next 的 typescript 类型定义生成器，可以从多个语言翻译 json 文件中生成类型定义，支持嵌套对象与参数。

## 生成类型定义

> 这个 cli 本身国际化配置的类型定义生成也是由 cli 完成的（自举）

```shell
yarn add -D @liuli-util/i18next-dts-gen
i18next-dts-gen --dirs src/i18n # 扫描这个目录下的 json 文件并生成 index.d.ts 类型定义
```

详情

```shell
$ i18next-dts-gen -h
Usage: bin [options]

根据 json 生成 .d.ts 类型定义

Options:
  -i, --input <input...>  包含一或多个翻译文件的目录
  -w, --watch             是否使用监视模式
  -h, --help              display help for command
```

## 在代码中使用

> 建议配合 [i18next-util](../i18next-util/README.md) 一起使用

下面是在 nodejs 中使用

```ts
// src/util/I18n.ts
import i18next from 'i18next'

export enum LanguageEnum {
  En = 'en',
  ZhCN = 'zhCN',
}

export class I18n<T extends any[]> {
  constructor() {}

  async changeLang(lang: LanguageEnum) {
    await i18next.changeLanguage(lang)
  }

  /**
   * 加载国际化
   */
  async init(resources: Record<LanguageEnum, object>, language: LanguageEnum) {
    await i18next.init({
      lng: language,
      resources: Object.entries(resources).reduce((res, [k, v]) => {
        Reflect.set(res, k, {
          translation: v,
        })
        return res
      }, {}),
    })
  }

  /**
   * 根据 key 获取翻译的文本
   * @param args
   */
  t(...args: T): string {
    // @ts-ignore
    return i18next.t(args[0], args[1])
  }
}
```

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
// App.tsx
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

当然，如果你需要在其他环境中使用，应该仅需需要 `getLanguage` 函数即可。

## 动机

为什么已经有了很多第三方的类型定义生成器，甚至最新版 i18next 官方已经推出了 typescript 解决方案，吾辈还要写这个呢？

简而言之，都不完善。

先从 i18next 官方的解决方案说起，它是将 json 文件替换为 ts 文件，但不能支持参数和嵌套对象。

> 注：最新版似乎利用了 typescript 4.2 的递归类型和模板字符串类型来保证类型安全，但这实际上是不怎么好用的。另外只有 react-i18next 是可用的。
>
> - [i18next typescript support](https://react.i18next.com/latest/typescript)
> - [StackOverflow i18next 的类型定义](https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript/58308279#58308279)

再来说 [i18next-typescript](https://github.com/LFDM/i18next-typescript) 这个第三方库，几乎能满足吾辈的需求了，除了一点：支持对象参数。还有像是 Jack 菊苣的 [i18n-codegen](https://github.com/Jack-Works/i18n-codegen)，代码设计上非常优雅，但同样的，不支持 react 之外的生态。

另外，就吾辈而言，认为使用生成器生成简单的类型要比从类型系统上支持这种功能更加容易，也更加合理。

## 设计

![架构图](https://github.com/rxliuli/liuli-tools/raw/dev/docs/zh/tools/i18next-dts-gen/images/schema.drawio.svg)
![流程图](https://github.com/rxliuli/liuli-tools/raw/dev/docs/zh/tools/i18next-dts-gen/images/flowchart.drawio.svg)

## FAQ

### 是否支持 i18next 的全部特性？

否，这里支持的仅为 i18next 的一个子集。

- [x] 为多个本地化 json 配置文件生成类型定义
- [x] 支持包含参数
  - [ ] 不支持对象参数
- [x] 支持嵌套的 key
- [ ] 不支持配置命名空间、嵌套的分割字符串，我们认为约定大于配置
- [ ] 不支持 json 之外的配置文件，我们认为 json 文件对于非开发者都更友好，而且在需要时开发者更容易处理
- [ ] 不支持 i18next 命名空间，即将翻译文件分割 -- 我们认为在翻译文件没有大于某个临界点之前分隔是得不偿失的
