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
yarn liuli-cli build lib # 打包库
yarn liuli-cli build cli # 打包 cli 引用程序
```

> 添加 `-w` 选项则启动 rollup 的监视模式，打包出来的 dist/ 不会压缩且不会将依赖项打进 bundle。

### 生成

```sh
yarn liuli-cli generate <name> --template lib # 生成 ts-lib 项目
yarn liuli-cli generate <name> --template cli # 生成 cli 项目
```

util 也支持交互式的创建项目

```shell
yarn liuli-cli generate
```

![交互式创建截图](./docs/交互式创建截图.gif)

### 同步配置

```shell
yarn liuli-cli sync
```

需要在 package.json 中指定同步哪些配置

```json
{
  "sync": ["prettier", "workspaces", "commitlint", "simplehooks"]
}
```

目前支持的配置项

- prettier
- commitlint
- simplehooks
- workspaces
- gitignore
- eslint-ts
- eslint-vue-ts
- jest

未来的目标：默认将包括检查 cli 自身的同步（如果需要在 monorepo 之外使用的话），eslint/style-lint 之类，还有在没有配置时实现交互式 cli

> 注：目前仅同步依赖而不会执行安装

也支持交互式的初始化同步配置

```shell
yarn liuli-cli sync init
```

## 设计理念

- 约定大于配置，如果可能应该不提供配置。VitePress 也是这样做的，参考：https://vitepress.vuejs.org/#lighter-page-weight 这会导致一些约束，包括以下内容
  - 打包库时入口文件必须是 `src/index.ts`，出口文件则是 `dist/index.esm.js` 与 `dist/index.js`
  - 打包 CLI 时入口文件必须是 `src/bin.ts`，出口文件则是 `dist/bin.js`
  - 在打包 lib 时会将所有的依赖作为外部依赖处理，而在打包 cli 时会将所有依赖项打进 bundle

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

### 为什么不捆绑外部依赖项

主要原因是希望将捆绑的工作交由最终应用完成，避免重复捆绑相同的依赖，而且还可以避免处理 nodejs 中直接基于文件系统使用 `worker_threads` 的问题。
