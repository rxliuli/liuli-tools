# @liuli-util/vite-plugin-svg-patch

将 svg 正确内联到 bundle 中，是现有 [vite issue（2020 年底提出的）](https://github.com/vitejs/vite/issues/1204) 的一个补丁。

## 使用

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgPatch } from '@liuli-util/vite-plugin-svg-patch'

export default defineConfig({
  plugins: [vue(), svgPatch()],
})
```

## 局限性

目前，没有找到一种钩子去处理 `vue style/css` 文件中使用 `background-image: url("")` 的图片资源，可能是只有 vite 内部才可以访问的钩子吧

> 一种思路是使用 transformHook，但吾辈暂时不想处理 sourcemap 之类的事情，所以暂未尝试。
