# @liuli-util/cmd-shim

## 简介

一个可以将 monorepo cli 模块链接到全局的 cli。

## 使用

```sh
npm i -g @liuli-util/cmd-shim
cd <module>
cmd-shim
```

## 动机

为什么不使用 npm/yarn link？

主要是因为在 monorepo 中，一个模块可能依赖于另一个私有模块，而使用 `npm link` 会因为无法找到私有模块而出错，事实上，pnpm/cnpm 因此 fork 了它们的 [cmd-shim](https://github.com/npm/cmd-shim/network/members) 项目。
