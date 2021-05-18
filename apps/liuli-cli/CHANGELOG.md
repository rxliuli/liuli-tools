# 更新日志

## 3.3.2

- 删除 @liuli-util/async 依赖，避免麻烦的循环依赖问题

## 3.3.1

- 修复依赖 rollup-plugin-add-shebang 放在 dev 的错误

## 3.3.0

- 将代码移至新的仓库：https://github.com/rxliuli/web-project-tools
- 实现 `liuli-cli build pkg/liuli-cli build cli` 两个子命令
- 支持使用 rollup 的监视模式
- 支持 `rollup.config.ts` 配置文件（但未在文档上公开）
