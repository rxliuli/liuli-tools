# @liuli-util/cli

一个针对于库和 CLI 应用程序打包的零配置 CLI。

## 起步

### 安装

```sh
yarn add -D @liuli-util/cli # 局部安装
npm i -g @liuli-util/cli # 全局安装
```

### 打包

```sh
liuli-cli build pkg # 打包库
liuli-cli build cli # 打包 cli 引用程序
```

> 添加 `-w` 选项则启动 rollup 的监视模式，打包出来的 dist/ 不会压缩

### 生成

```sh
liuli-cli generate <name> --template lib # 生成 ts-lib 项目
liuli-cli generate <name> --template cli # 生成 cli 项目
```

### 其它命令

- `clean`: 删除 `dist` 目录，废弃，应该使用 `@liuli-util/shell` 的 `rm` 命令
- `addHusky`: 为项目添加一些必须的钩子，包括代码格式、git 提交信息规范化。可能有更好的形式，例如 vue 的可插拔的分别添加或者生成模板项目

## 设计理念

- 约定大于配置，如果可能应该不提供配置。VitePress 也是这样做的，参考：https://vitepress.vuejs.org/#lighter-page-weight
  这会导致一些约束，包括以下内容
  - 打包库时入口文件必须是 `src/index.ts`，出口文件则是 `dist/index.esm.js` 与 `dist/index.js`
  - 打包 CLI 时入口文件必须是 `src/bin.ts`，出口文件则是 `dist/bin.js`
  - 会将所有的依赖作为外部依赖处理

## FAQ

### 为什么底层没有选择 esbuild

事实上，esbuild 本身非常非常非常快（重要的事情说三遍），但如果使用 js 封装 CLI，则性能会迅速降低。

打包这个项目使用 esbuild、cli 封装、rollup 的时间对比如下

| 打包方式 | 时间  |
| -------- | ----- |
| esbuild  | 0.49s |
| cli 封装 | 3.2s  |
| rollup   | 3.65s |

> 现在 [vscode 插件打包官方推荐使用 esbuild](https://code.visualstudio.com/api/working-with-extensions/bundling-extension) ，吾辈在生产项目中也有过实践，长期而言吾辈比较看好这类更高性能的打包工具。

### 为什么不能包含 @liuli-util 工具包

这在 monorepo 项目中会导致循环依赖，即 `@liuli-util/cli` 依赖于 @liuli-util/async，在打包 @liuli-util/async 时，由于 monorepo 会替换 node_modules
中的同名包，进而导致 `@liuli-util/async => @liuli-util/cli => @liuli-util/async` 的依赖查找失败的问题。
