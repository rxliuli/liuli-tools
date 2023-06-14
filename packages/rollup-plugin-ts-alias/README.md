# @liuli-util/rollup-plugin-ts-alias

> [中文](https://github.com/rxliuli/liuli-tools/blob/master/libs/rollup-plugin-ts-alias/README.zh-CN.md)

Plugins that point modules directly to the _src/index.ts_ source, avoiding the problem of needing to initialize a lot of libs in a monorepo and having to build before using the libs.

There are the following requirements

- lib maintainers need to release lib for use outside of monorepo
- lib maintainers need to run `npm run build` or use `npm run dev` to open an additional terminal after every modification to lib
- users of lib need to `npm run initialize-all` to rebuild all libs to keep up-to-date after every other update

> Similar solution from ts level: <https://github.com/DimensionDev/Maskbook/blob/develop/tsconfig.json>, the reason why we can't do this is that esbuild does not take this configuration of ts.

## Use

Install

```sh
pnpm i -D @liuli-util/rollup-plugin-ts-alias
```

configure

```ts
// vite.config.ts
import { tsAlias } from '@liuli-util/rollup-plugin-ts-alias'

export default defineConfig({
  plugins: [tsAlias(['@liuli-util/'])],
})
```

After that, it can be hot-updated by directly modifying the source code of lib, no need to start additional terminal, and no need to add `initialize` command for full initialization.

> At present, there are more than 70 monorepo in the production environment, and the initialization takes about 30s (this is already the effect of using esbuild optimization).

## options

| Options    | Type                 | Description                                                             |
| ---------- | -------------------- | ----------------------------------------------------------------------- |
| `includes` | `(string\|RegExp)[]` | Matching modules, it is recommended to use the organization name        |
| `excludes` | `(string\|RegExp)[]` | Excluded modules, import containing two `/` will be excluded by default |

## FAQ

### vite compatibility

vite is supported by default and is executed before vite's default resolveId. For details, please refer to <https://cn.vitejs.dev/guide/api-plugin.html#plugin-ordering>

### Limitations

It must be packaged through vite/rollup, if it is directly referenced and executed with nodejs (or esno, etc.), there will still be problems, but it does work for the vast majority of web projects.

### exports support

When specifying exports in package.json, nodejs access to packages is limited to the paths declared in exports. In order for plugins to be able to rewrite imports, projects must export `./src`

which may originally be

```json
{
  "exports": {
    "import": ". /dist/index.js",
    "require": ". /dist/index.cjs"
  }
}
```

needs to be modified to

```json
{
  "exports": {
    ".": {
      "import": ". /dist/index.js",
      "require": ". /dist/index.cjs"
    },
    ". /src": ". /src/index.ts"
  }
}
```

> Reference [nodejs subpath export](https://nodejs.org/api/packages.html#subpath-exports)
