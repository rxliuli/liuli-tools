# 更新日志

## 3.4.3

- feat(@liuli-util/cli): 修改名字 define => defineConfig，与 vite 保持一致
- feat(@liuli-util/cli): define 辅助函数支持 RollupOptions | RollupOptions[]

## 3.4.2

- feat(@liuli-util/cli): 添加 define 定义 rollup 配置的辅助函数
- feat(@liuli-util/cli): 使用 shell rm 代替 liuli-cli clean

## 3.4.1

- fix(@liuli-util/cli): 修复在监视模式下仍然使用 terser 插件的错误
- feat(@liuli-util/cli): 实现基本的模板项目生成命令（支持 cli/lib）
- refactor(root): 将 templates/ 目录移至 apps/liuli-cli 下便于直接复制模板项目
- docs(@liuli-util/cli): 更新 README，更新设计理念
- build(@liuli-util/cli): 添加 setup 初始化脚本，将 typescript 作为开发时依赖
- docs(@liuli-util/cli): 更新 README **打包库 => 打包**
- feat(@liuli-util/cli): 删除根据配置打包的功能
- feat(@liuli-util/cli): 生成 cli 的时候默认不生成类型定义

## 3.4.0

- feat(@liuli-util/cli): 默认包含 rollup 插件 @rollup/plugin-json 和 rollup-plugin-node-externals

## 3.3.2

- 删除 @liuli-util/async 依赖，避免麻烦的循环依赖问题

## 3.3.1

- 修复依赖 rollup-plugin-add-shebang 放在 dev 的错误

## 3.3.0

- 将代码移至新的仓库：https://github.com/rxliuli/web-project-tools
- 实现 `liuli-cli build pkg/liuli-cli build cli` 两个子命令
- 支持使用 rollup 的监视模式
- 支持 `rollup.config.ts` 配置文件（但未在文档上公开）
