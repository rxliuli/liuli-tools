# 更新日志

## 3.5.0

- feat(@types/rollup-plugin-auto-external): 在给 DefinitelyTyped 提的 PR 没有通过前的一个临时模块
- chore(@liuli-util/cli): 使用 liuli-cli build config 提到 rollup，以使用 ts 配置文件
- refactor(@liuli-util/cli): 将默认导出 utils/ 下的工具类
- feat(@liuli-util/cli): 支持使用 liuli-cli build config 命令，默认读取 rollup.config.ts 配置文件
- chore(@liuli-util/cli): 删除 @liuli-util/shell 的依赖，升级 rollup 版本
- feat(@liuli-util/cli): 使用 rollup-plugin-auto-external 插件替代 scanExternal 函数
- fix(@liuli-util/cli): 修复使用 ts-node 运行代码时仍然注册 ts-node 的错误
- docs(root): 使用 ts-node 替代 rollup 编译配置文件的做法
- docs(root): 更新 repository.url 为 github 上子模块的 url

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

- 将代码移至新的仓库：https://github.com/rxliuli/liuli-tools
- 实现 `liuli-cli build pkg/liuli-cli build cli` 两个子命令
- 支持使用 rollup 的监视模式
- 支持 `rollup.config.ts` 配置文件（但未在文档上公开）
