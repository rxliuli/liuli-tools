# CHANGELOG

## 0.2.0

- feat(@liuli-util/shell): 改变 cp/mv 的行为，具体参考：[cp/mv 命令的行为似乎有点奇怪？](https://github.com/rxliuli/web-project-tools/blob/master/apps/shell/README.md#cpmv-%E5%91%BD%E4%BB%A4%E7%9A%84%E8%A1%8C%E4%B8%BA%E4%BC%BC%E4%B9%8E%E6%9C%89%E7%82%B9%E5%A5%87%E6%80%AA)
- fix(@liuli-util/shell): 修复依赖声明缺失的问题
- test(@liuli-util/shell): 为 ShellProgram 添加完整的测试用例
- fix(@liuli-util/shell): 修复 commander 要求可变参数必须是最后一个带来的一些问题

## 0.1.1

- chore(@liuli-util/shell): 更新 rollup 版本为最新
- chore(@liuli-util/cli): 删除 @liuli-util/shell 的依赖，升级 rollup 版本
- chore(@liuli-util/shell): 在 setup 命令中重置 .bin/ 目录，删除 @liuli-util/cli 依赖
- docs(@liuli-util/shell): 更新 FAQ
- docs(@liuli-util/shell): 发布到公共的组织下

## 0.1.0

- 实现基本的 unix\* 命令
