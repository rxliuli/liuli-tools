# @liuli-util/vite-plugin-env-dts-gen

扫描环境变量生成 dts 类型定义，避免手动维护环境变量的 dts 类型定义。

## 使用

```sh
pnpm i -D @liuli-util/vite-plugin-env-dts-gen
```

配置插件

```ts
//vite.config.ts
import { defineConfig } from 'vite'
import { envDtsGen } from '@liuli-util/vite-plugin-env-dts-gen'

export default defineConfig({
  plugins: [envDtsGen()],
})
```

> [示例项目](https://github.com/rxliuli/liuli-tools/tree/master/examples/vite-plugin-env-dts-gen-example)

## FAQ

### 默认插件有以下行为

- 当 `src/vite-env.d.ts` 中的 `ImportMetaEnv` 接口已经包含字段时，不会重复添加或替换，而是跳过，这个行为主要是为了让用户可以自定义环境变量
- 永远不会自动清除环境变量，即便它已经在 .env\* 中不存在了，理由同上
- 构建时强制生成一次环境变量，即便没有任何变化，这个行为是为了避免第一次拉取代码之后立刻构建的情况
