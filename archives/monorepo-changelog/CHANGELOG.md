# CHANGELOG

## 0.2.1

<!--hash:eaddbae71ed959e9c8bae642485342f96d7c950f-->

- chore: 修复合并之后衍生的各种问题
- chore: 将所有的 liuli-cli 的依赖强制指向本地
- chore: 删除 changelog 的 setup 脚本
- chore: 重新 yarn 安装依赖引起的变更
- chore: 升级所有的依赖
- fix: 修复 nodejs cli 中 bin.js 没有添加顶部声明的错误
- feat: 使用 pnpm + nx 替代 yarn
- feat: 将 tsconfig 中的编译目标修改为 ESNext
- feat: 迁移 ts-node 为更高效的 esno

## 0.2.1

<!--hash:995399ad9071c15100c07db9c03d70f7079304e8-->

- fix: 修复 monorepo-changelog 不能支持旧的 changelog 格式的问题
- chore: 修复一些构建问题，主要是递归调用 setup

## 0.2.0

<!--hash:ca27f54052240ac3a68ff3dbbe171107b8c4dc37-->

- chore: 不再将 Command 实例导出，而仅导出逻辑部分
- chore: 由于 @liuli-util/monorepo-changelog 与 cli 循环依赖，所以不能作为插件直接依赖
- fix: 修复生成多个版本时 changelog 有问题
- feat: 当 CHANGELOG 文件不存在时就创建它而非退出
- docs: 在 README 中添加基本的使用方法

## 0.1.0

- docs: 在 README 中添加基本的使用方法
- chore: 由于 @liuli-util/monorepo-changelog 与 cli 循环依赖，所以不能作为插件直接依赖