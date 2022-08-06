# @liuli-util/cycle-deps-check

一个检查 monorepo 循环依赖的 cli 工具，支持 pnpm/yarn/npm。

## 使用

```sh
$ npm i -g @liuli-util/cycle-deps-check
$ cycle-deps-check
cycle deps:  [
  '@liuli-util/cmd-shim',
  '@liuli-util/async',
  '@liuli-util/cli',
  '@liuli-util/esbuild-plugins',
  '@liuli-util/cli'
]
```
