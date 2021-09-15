# CHANGELOG

## 3.9.0

<!--hash:40983b8dc09a06111d642c8c99b16d2ff8319195-->

- chore: 添加 publishConfig 配置，删除不需要的 _gitignore 文件
- feat: 为 liuli-cli 实现插件系统

## 3.8.4

<!--hash:d805931cc642fd8002f7ca93a551510b986f5523-->

- 修复发布后的内容不包含 .gitignore 的问题

## 3.8.3

- 修复模板中的一些依赖缺失和脚本错误的问题

## 3.8.2

- 修复发布后的内容不包含 .gitignore 的问题

## 3.8.1

- 修复缺失 .gitignore 文件的问题

## 3.8.0

- chore: 在项目本身使用 eslint 通用配置并同步
- feat: 实现同步 eslint 配置，支持交互式创建模板项目
- feat: 删除不需要的工具函数，删除 build config 命令
- feat: 再模板中添加 initialize 命令以在 monorepo 中初始化
- chore: 将生成的 i18n/index.d.ts 添加到 git 忽略文件中，并在根项目同步
- feat: 支持同步 gitignore
- feat: 实现同步配置的命令
- feat: 当目录已经存在时，在命令行中交互式的提示是否覆盖它
- feat: 生成模板项目默认不再删除目标目录
- fix: 修复最终发布没有包含 .gitignore 的问题
- feat: 生成的项目默认使用通用 .gitignore 配置
- feat: 同步 yarn workspaces 和 lerna packages（以后升级 yarn2 有望干掉这个同步）, 删除 monorepo-cli 模块

## 3.7.1

- fix(@liuli-util/cli): 修复模板中的依赖没有更新的问题（后面应该使用自动化的方案）

## 3.7.0

- feat(@liuli-util/prettier-standard-config): 更新 husky 的配置，使用 simple-git-hooks 替代 husky
- feat(@liuli-util/prettier-standard-config): 统一 prettier 配置

## 3.6.0

- chore(@liuli-util/cli): 更新 @types/rollup-plugin-auto-external，修复类型定义的错误
- refactor(@liuli-util/cli): 标记 build config 和 defineConfig 将被废弃，使用 rm 替代 rimraf
- chore(@liuli-util/cli): 为模板添加 CHANGELOG
- feat(@liuli-util/cli): 更新模板项目，使用 @liuli-util/shell 替换 liuli-cli clean 命令
- chore(@liuli-util/cli): 删除 tsconfig.json 中冗余的各种配置
- fix(@liuli-util/cli): 删除不小心提交的 test 目录

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