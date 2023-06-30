# create-liuli

个人使用的创建 lib/cli 的模版应用创建程序，使用方法

目前支持的类型包括

- lib: 创建一个 lib 模版，基于 vite/vitest 构建，提供正确的 exports 配置，默认仅支持 esm
- cli: 创建一个 cli 模版，基于 vite/vitest/vite-node 构建，默认支持 esm

计划支持的模版

- vscode 插件
- chrome 插件
- nodejs 服务
- userscript
- electron 应用

## 使用

```bash
pnpm create liuli
# 然后根据提示输入项目名称和类型就好了
```
