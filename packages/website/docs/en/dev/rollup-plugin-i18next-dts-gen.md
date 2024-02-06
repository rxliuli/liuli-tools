# @liuli-util/rollup-plugin-i18next-dts-gen

## Scenario

We have some projects that need to use i18next to handle internationalization. However, when using TypeScript, we need type definitions. Therefore, we have implemented [@liuli-util/i18next-dts-gen](https://github.com/rxliuli/liuli-tools/blob/master/libs/i18next-dts-gen/README.EN.md) to automatically generate .d.ts files. Later, we found that this process can be integrated into the build process, eliminating the need to start a separate terminal command. Currently, it supports direct integration into the rollup/vite build process.

## Installation

```sh
pnpm i -D i18next @liuli-util/rollup-plugin-i18next-dts-gen
```

## Add translation files

Add the translation JSON files under `src/i18n/`. Here are two examples:

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

## Configure `vite.config.ts`

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

## Start the local server

```sh
pnpm dev
```

You will find that the `index.d.ts` type definition is automatically generated in the `src/i18n/` directory, as shown below:

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

Then you can use this type for prompts or validations. Here is the simplest example. For more detailed examples combining with React, please refer to [rollup-plugin-i18next-dts-gen-example](https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-i18next-dts-gen-example).

```ts
/**
 * Get translated text based on the key
 * @param args
 */
function t<K extends keyof TranslateType>(...args: T[K]['params']): T[K]['value'] {
  // @ts-ignore
  return i18next.t(args[0], args[1])
}

console.log(t('hello'))
```

## Configuration

```ts
export interface GenerateOptions {
  // List of directories for i18n. Multiple directories can be specified. JSON files will be scanned in each subdirectory to generate the corresponding .d.ts file.
  dirs: string[]
}
```
