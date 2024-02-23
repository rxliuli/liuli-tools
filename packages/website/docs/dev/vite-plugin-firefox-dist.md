# @liuli-util/vite-plugin-firefox-dist

将构建的 chrome 扩展转换为 firefox 扩展，仅允许支持 manifest v3 的 firefox 版本。参考：[firefox manifest v3 迁移指南](https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/)

## 使用

在 vite.config.ts 中配置

```ts
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { firefox } from '@liuli-util/vite-plugin-firefox-dist'

export default defineConfig({
  plugins: [
    crx({
      manifest,
    }),
    firefox(),
  ],
})
```

这个扩展会将 dist 目录下的 chrome 扩展的 manifest.json 做一些转换，并将转换后的文件放在 dist-firefox 目录下，稍后可以使用 web-ext 打包 zip 并提交。
