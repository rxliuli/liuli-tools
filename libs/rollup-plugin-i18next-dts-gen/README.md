# @liuli-util/rollup-plugin-i18next-dts-gen

## Scenes

> [中文](https://github.com/rxliuli/liuli-tools/blob/master/libs/rollup-plugin-i18next-dts-gen/README.zh-CN.md)

We have some projects that need to use i18next to handle internationalization, but the use of typescript requires type definitions, so [@liuli-util/i18next-dts-gen](https://github.com/rxliuli/liuli-tools/blob/master/libs/i18next-dts-gen/README.md) is used to automatically generate .d.ts files. But later we found that this process can be integrated into the build, no need to start a separate terminal command, currently supports direct integration into the rollup/vite build process.

## Quick start

### Install

```sh
pnpm i -D i18next @liuli-util/rollup-plugin-i18next-dts-gen
```

### Add the translated json file under _src/i18n/_, add two examples below

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
  "hello": "Hello, world",
  "toggle": "Switch language"
}
```

### Configure `vite.config.ts`

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

### Start the local server

```sh
pnpm dev
```

You will find that the `index.d.ts` type definition is automatically generated in the _src/i18n/_ directory, roughly as follows

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

Then you can use this type for prompting or verification. Below is the simplest example. For more detailed examples combining react, please refer to [rollup-plugin-i18next-dts-gen-example](https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-i18next-dts-gen-example).

```ts
/**
 * Get the translated text according to the key
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
  // Multiple i18n directories can be specified, and the json file will be scanned in each subdirectory and the corresponding .d.ts will be generated
  dirs: string[]
}
```
