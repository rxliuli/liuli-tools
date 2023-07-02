# CHANGELOG

## 0.6.4

### Patch Changes

- Updated dependencies
  - @liuli-util/async@3.6.1

## 0.3.3

<!--hash:7535f3bf8f63b1f05553121ad22555a09721b38c-->

- fix: 修复作为 lib 调用时 i18n.t 无效的错误

## 0.3.2

<!--hash:0b3c831f5800f97627da399e7dbb5542d3703bea-->

- fix: 降级 os-locale 以使用支持 cjs 的旧版本

## 0.3.1

<!--hash:74d0af318de9fcb189c91ffa9932ae9ee754f26d-->

- feat: 创建 rollup-plugin-i18next-dts-gen 以支持将生成类型定义添加到构建流程中
- feat: 将 tsconfig 中的编译目标修改为 ESNext
- feat: 迁移 ts-node 为更高效的 esno
- feat: 支持 ts 类型系统提示返回值的结果大致上是什么
- fix: 修复项目中各种依赖、类型、测试错误
- chore: 升级所有的依赖
- chore: 更新 yarn plugin changed 插件的安装位置，修改为在线的 gh-pages 地址
- chore: 尽可能地解决 yarn2 安装依赖时的警告
- chore: 修复各种问题
- chore: 升级 yarn 2，放弃使用 lerna
- chore: 使用 \* 替代具体的版本
- chore: 添加发布与仓库配置
- chore: 修复引入 i18next-dts-gen 模块带来的各种奇怪的问题
- chore: 将 i18next-dts-gen 模块引入到这个项目
- docs: 修复文档引用链接错误
- docs: 修复 markdown 格式错误
- docs: 修复一些小问题
- docs: 使用 typedoc 打包 api 文档
- docs: 删除并忽略 docs 目录
- docs: 修复图表引用链接错误
- docs: 更新文档，调整示例与详细说明的顺序
- style: 修复各种 eslint 报的低级错误
- refactor: 在 @liuli-util/i18next-dts-gen 项目中集成 @liuli-util/i18next-util

## 0.3.0

- feat: Support generating return value types based on default language
- feat: change --input to --dir
- feat: no longer support nested keys

## 0.2.1

- Fixed many documentation issues

## 0.2.0

- Rename package `i18next-typescript-generator` => `@liuli-util/i18next-dts-gen`
- Internationalization of the cli itself
- Support for generating type definitions for multiple directories at once
- Support monitoring mode
- Remove the gen subcommand and use the `i18next-dts-gen` command directly
- Use ast to refactor the type definition generation part, replacing the original string splicing
- The refactoring code is divided into `Watcher/Scanner/Parser/Generator` sections according to the basic flow

## 0.1.1

- Basic implementation scans a single directory to generate type definitions
