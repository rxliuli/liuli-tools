# @liuli-util/cli

一个针对于库和 CLI 应用程序打包的零配置 CLI。

## 起步

### 安装

```sh
pnpm i -D @liuli-util/cli # 局部安装
pnpm i -g @liuli-util/cli # 全局安装
```

### 打包

```sh
liuli-cli build lib # 打包库
liuli-cli build cli # 打包 cli 引用程序
```

> 添加 `-w` 选项则启动 rollup 的监视模式，打包出来的 dist/ 不会压缩且不会将依赖项打进 bundle。

![监视模式](https://liuli.dev/images/liuli-cli%20%E7%9B%91%E8%A7%86%E6%A8%A1%E5%BC%8F.gif)

### 生成

```sh
liuli-cli generate <name> --template lib # 生成 ts-lib 项目
liuli-cli generate <name> --template cli # 生成 cli 项目
```

util 也支持交互式的创建项目

```shell
liuli-cli generate
```

![liuli-cli 交互式创建截图](https://liuli.dev/images/liuli-cli%20%E4%BA%A4%E4%BA%92%E5%BC%8F%E5%88%9B%E5%BB%BA%E6%88%AA%E5%9B%BE.gif)

### 部署

支持部署前端资源通过 sftp/gh-pages 部署到远端，配置信息在 package.json 中的 `deploy` 字段

```sh
liuli deploy
```

公共

| 配置   | 说明                      | 默认值 |
| ------ | ------------------------- | ------ |
| `type` | 部署类型，`sftp/gh-pgaes` | 无     |
| `dist` | 静态资源目录              | 无     |
| `dest` | 部署的远端目录            | 无     |

sftp

| 配置                 | 说明           | 默认值 |
| -------------------- | -------------- | ------ |
| `sshConfig.host`     | ssh 的 ip 地址 |        |
| `sshConfig.port`     | ssh 的端口号   | 22     |
| `sshConfig.username` | ssh 的用户名   |        |

gh-pages

| 配置              | 说明                | 默认值               |
| ----------------- | ------------------- | -------------------- |
| `repo?: string`   | 推送的项目 git 地址 | 默认为当前项目       |
| `remote?: string` | 推送的远端          | 默认为 origin        |
| `branch?: string` | 远端分支名          | 默认为 gh-pages      |
| `add?: boolean`   | 是否增量推送        | 默认会清理 dest 目录 |

部署 vuepress 文档网站示例配置

```json
{
  "deploy": {
    "type": "gh-pages",
    "dist": "docs/.vuepress/dist"
  }
}
```

### 同步配置

```shell
liuli-cli sync
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
liuli-cli sync init
```

## 设计理念

- 约定大于配置，如果可能应该不提供配置。VitePress 也是这样做的，参考：https://vitepress.vuejs.org/#lighter-page-weight 这会导致一些约束，包括以下内容
  - 打包库时入口文件必须是 `src/index.ts`，出口文件则是 `dist/index.esm.js` 与 `dist/index.js`
  - 打包 CLI 时入口文件必须是 `src/bin.ts`，出口文件则是 `dist/bin.js`
  - 在打包 lib 时会将所有的依赖作为外部依赖处理，而在打包 cli 时会将所有依赖项打进 bundle

## FAQ

### 为什么不捆绑外部依赖项

主要原因是希望将捆绑的工作交由最终应用完成，避免重复捆绑相同的依赖，而且还可以避免处理 nodejs 中直接基于文件系统使用 `worker_threads` 的问题。
