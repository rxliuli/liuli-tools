# CHANGELOG

## 3.18.0

- feat: 支持自定义 `repo/remote/branch` 等配置

## 3.17.0

- feat: 不再处理并发发布的问题

## 3.16.0

- feat: 不再处理并发部署 gh-pages 的问题
- feat: 实现一个根据配置文件决定是否需要等待的 gh-pages 部署（实测会有并发问题）
- feat: 实现部署项目到 gh-pages 远端
- feat: 实现发布到 sftp 远端

## 3.15.0

<!--hash:5402013d664173283c30e818a63d427fa55edf73-->

- feat: 同步命令支持同步 jest 依赖
- chore: 更新模板，删除不需要的文档相关的命令
- chore: 将所有的 liuli-cli 的依赖强制指向本地
- fix: 修复 monorepo 中使用 cli 会复制 node_modules 的错误

## 3.14.0

<!--hash:640b9c257c2276edfe262e2cbfd1c11bab6fb27b-->

- feat: 构建 iife 时强制包含所有依赖

## 3.13.1

<!--hash:0f666fdbeee514f614a61b5257c4aa9a6cfd3143-->

- fix: 修复 generate 不能选择模板的问题

## 3.13.0

<!--hash:615c6f1f69083a4cf7b0760ee6a81c68c2cf6e85-->

- test: 修复一些单元测试的错误
- feat: 构建 cli 时无论如何都会打包依赖
- feat: 使用 pnpm + nx 替代 yarn
- fix: 修复 nodejs cli 中 bin.js 没有添加顶部声明的错误
- fix: 修复 cli 模板项目 bin 字段指向文件不存在的问题

## 3.12.0

<!--hash:18b4c02da2ba2d55b6c26cd2b45dbf370855f721-->

- feat: 支持单独构建某种文件的功能
- feat: 支持构建 iife 格式的 bundle 时自动设置 global
- feat: 支持构建 iife 格式的 bundle

## 3.11.1

<!--hash:ba04dd24f8ee1e4a83c06dbd289195587a221079-->

- fix: 修复 tsconfig.json 不是标准 json 无法直接解析的错误，修复路径不是绝对值的错误
- docs: 修复交互式创建的 gif 演示地址 404 的错误
- docs: 更新 build 命令监视模式的 gif 演示

## 3.11.0

<!--hash:5036beb706902f3ec7e8122696f99cefa7c51f57-->

- fix: 修复构建的包过大的问题（非压缩 10+M）
- fix: 修复构建时任务数量不确定导致失败的错误
- fix: 修复打包时提示 pnpapi 依赖缺失问题
- fix: 修复一个单元测试错误
- feat: 重构 esbuild 命令，优化 cli 提示信息
- feat: 使用 esbuild dts 插件只编译入口点声明和引用的 ts 类型定义
- feat: 将 node 内置包通过插件替换和排除
- feat: 默认忽略 node 原生模块
- perf: 使用 lodash-es 替换 lodash 减小最终打包 bin.js 的大小

## 3.10.1

<!--hash:c0223e217f45ec5d1c39e14035a494ca49b8e868-->

- fix: 修复没有添加 esbulild 作为运行时依赖的错误

## 3.10.0

<!--hash:13921896bfb584abdefb3b055f7c914e88cebe4d-->

- chore: 重新 yarn 安装依赖引起的变更
- chore: 删除 liuli-shell、liuli-build 的 setup 脚本，因为没有模块依赖于它们了
- chore: 升级所有的依赖
- chore: 删除不需要的依赖
- feat: 将 tsconfig 中的编译目标修改为 ESNext
- feat: 迁移 ts-node 为更高效的 esno
- feat: 将 liuli-cli 合并为一个仓库
- feat: 将 liuli-cli 的插件作为子模块一起发布
- docs: 更新网站标题
- fix: 修复 @liuli-util/liuli-cli-plugin-sync 影响的模块

## 3.9.1

<!--hash:8516e723871614844f91a47928510c88f152fae8-->

- fix: 修复 @liuli-util/liuli-cli-plugin-sync 影响的模块

## 3.9.0

<!--hash:40983b8dc09a06111d642c8c99b16d2ff8319195-->

- chore: 添加 publishConfig 配置，删除不需要的 \_gitignore 文件
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
