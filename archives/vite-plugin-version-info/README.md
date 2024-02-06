# @liuli-util/vite-plugin-version-info

将项目的版本信息写入到 html 与 js 环境变量的 vite 插件。

## 使用

```sh
pnpm i -D @liuli-util/vite-plugin-version-info
```

```ts
import { standardInfo } from '@liuli-util/vite-plugin-version-info'
export default defineConfig({
  plugins: [standardInfo()],
})
```
