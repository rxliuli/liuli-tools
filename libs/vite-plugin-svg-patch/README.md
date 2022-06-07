# @liuli-util/vite-plugin-svg-patch

Proper inlining of svg into the bundle is a patch to the existing [vite issue (proposed late 2020)](https://github.com/vitejs/vite/issues/1204).

## Use

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgPatch } from '@liuli-util/vite-plugin-svg-patch'

export default defineConfig({
  plugins: [vue(), svgPatch()],
})
```

## Limitations

Currently, there is no hook to handle image resources in `vue style/css` files that use `background-image: url("")`, probably a hook that can only be accessed internally by vite

> One idea is to use transformHook, but I don't want to deal with sourcemap or something like that for now, so I haven't tried it yet.
