# CHANGELOG

## 0.2.0

<!--hash:ca27f54052240ac3a68ff3dbbe171107b8c4dc37-->

- chore: 不再将 Command 实例导出，而仅导出逻辑部分
- chore: 由于 @liuli-util/monorepo-changelog 与 cli 循环依赖，所以不能作为插件直接依赖
- fix: 修复生成多个版本时 changelog 有问题
- feat: 当 CHANGELOG 文件不存在时就创建它而非退出
- docs: 在 README 中添加基本的使用方法

## 0.1.0

<!--hash:d9066392dcd06626aad7c326ab08a0b57d073a80-->

- docs: 在 README 中添加基本的使用方法
- chore: 由于 @liuli-util/monorepo-changelog 与 cli 循环依赖，所以不能作为插件直接依赖