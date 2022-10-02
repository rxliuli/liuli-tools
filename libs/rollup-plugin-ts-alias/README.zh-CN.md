# @liuli-util/rollup-plugin-ts-alias

将模块直接指向 _src/index.ts_ 源码的插件，避免在 monorepo 中需要初始化大量 lib 以及使用 lib 之前必须构建的问题。

有以下几个需求

- lib 的维护者 需要发布 lib 给 monorepo 之外使用
- lib 的维护者 每次修改 lib 之后都需要运行 `npm run build` 或使用 `npm run dev` 额外开启一个终端
- lib 的使用者 每次其他人更新之后都需要 `npm run initialize-all` 重新构建所有 lib 以保持最新

> 从 ts 层面类似的解决方案：<https://github.com/DimensionDev/Maskbook/blob/develop/tsconfig.json>，我们无法这样做的原因在于 esbuild 不走 ts 的这个配置。

## 使用

安装

```sh
pnpm i -D @liuli-util/rollup-plugin-ts-alias
```

配置

```ts
// vite.config.ts
import { tsAlias } from '@liuli-util/rollup-plugin-ts-alias'

export default defineConfig({
  plugins: [tsAlias(['@liuli-util/'])],
})
```

之后，直接修改 lib 的源码便能热更新，不需要启动额外的 terminal，也不再需要添加 `initialize` 命令供全部初始化。

> 目前生产环境 monorepo 已超过 70 个，初始化大约需要 30s 左右（这已经是使用 esbuild 优化之后的效果）。

## 选项

| 选项       | 类型                 | 说明                                         |
| ---------- | -------------------- | -------------------------------------------- |
| `includes` | `(string\|RegExp)[]` | 匹配的模块，建议使用组织名                   |
| `excludes` | `(string\|RegExp)[]` | 排除的模块，默认会排除包含两个 `/` 的 import |

## FAQ

### vite 兼容性

默认支持 vite 并在 vite 默认的 resolveId 之前执行，具体参考 <https://cn.vitejs.dev/guide/api-plugin.html#plugin-ordering>

### 局限性

必须经过 vite/rollup 打包才行，如果是直接引用并使用 nodejs（或 tsx 等） 执行则仍然会有问题，但它确实适用于绝大多数 web 项目。

### exports 支持

在 package.json 中指定 exports 时，nodejs 访问包的功能会受到限制，只能访问在 exports 中声明的路径。为了插件能够重写 import，项目必须导出 `./src`

原先可能是

```json
{
  "exports": {
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  }
}
```

需要修改为

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./src": "./src/index.ts"
  }
}
```

> 参考 [nodejs 子路径导出](https://nodejs.org/api/packages.html#subpath-exports)
