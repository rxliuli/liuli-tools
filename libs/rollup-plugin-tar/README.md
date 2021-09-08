# @liuli-util/rollup-plugin-tar

## 简介

实现 tar 插件用以将打包后的目录打包为 tar 包，目前主要用于打包 joplin 插件，但也可以作为通用模块。

## 使用

```sh
yarn add -D @liuli-util/rollup-plugin-tar
```

然后在 rollup.config.js 中配置

```ts
tar({
  sourceDir: 'dist',
  destPath: 'test.tar',
})
```
