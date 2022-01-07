# @liuli-util/rollup-plugin-i18next-dts-gen

## 场景

我们有一些项目需要使用 i18next 来处理国际化，但是使用 typescript 需要有类型定义，所以实现了 [@liuli-util/i18next-dts-gen](https://github.com/rxliuli/liuli-tools/blob/master/libs/i18next-dts-gen/README.ZH_CN.md) 用来自动生成 .d.ts 文件。但之后我们发现可以将这个过程集成到构建中，不再需要额外单独启动一个终端命令，目前支持直接集成到 rollup/vite 的构建流程中。

## 快速入门

### 安装

```sh
pnpm i -D i18next @liuli-util/rollup-plugin-i18next-dts-gen
```

### 在 _src/i18n/_ 下添加翻译的 json 文件，下面添加两个示例

```json
// src/i18n/en-US.json
{
  "hello": "hello world",
  "toggle": "Switch language"
}
```

```json
// src/i18n/zh-CN.json
{
  "hello": "你好，世界",
  "toggle": "切换语言"
}
```

### 配置 `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import { i18nextDtsGen } from '@liuli-util/rollup-plugin-i18next-dts-gen'

export default defineConfig({
  plugins: [
    i18nextDtsGen({
      dirs: ['src/i18n'],
    }),
  ],
})
```

### 启动本地服务器

```sh
pnpm dev
```

你将会发现 _src/i18n/_ 目录下自动生成了 `index.d.ts` 类型定义，大致如下

```ts
export type TranslateType = {
  hello: {
    value: 'hello world'
    params: [key: 'hello']
  }
  toggle: {
    value: 'Switch language'
    params: [key: 'toggle']
  }
}
```

然后你便可以使用这个类型做提示或校验了，下面是一个最简单的示例，更详细的结合 react 的示例请参考 [rollup-plugin-i18next-dts-gen-example](https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-i18next-dts-gen-example)。

```ts
/**
 * 根据 key 获取翻译的文本
 * @param args
 */
function t<K extends keyof TranslateType>(...args: T[K]['params']): T[K]['value'] {
  // @ts-ignore
  return i18next.t(args[0], args[1])
}

console.log(t('hello'))
```

## 配置

```ts
export interface GenerateOptions {
  // i18n 的目录，可以指定多个，会在每一个子目录下扫描 json 文件并生成对应的 .d.ts
  dirs: string[]
}
```
