# CHANGELOG

## 0.1.1

<!--hash:111f5c9d1956be1cf3769cc22051803d9e3aed55-->

- fix: 修复发生错误没有正确返回 1 的问题
- chore: 添加 yarn workspaces foreach 错误示例可复现代码
- chore: 更新 yarn plugin changed 插件的安装位置，修改为在线的 gh-pages 地址
- docs: 在 README 文档中添加安装的链接

## 0.1.0

<!--hash:586446ad046b3d5a4b3ad79c53777869131f5d4d-->

- chore: 删除 list 命令的 --json 参数
- feat: 支持使用 list 命令查询构建缓存，修建缓存的 key，仅保存实际执行的命令
- chore: 升级 clipanion3，放弃使用注解
- perf: 优化查询缓存的性能（主要是 git 查找）
- feat: 基本实现构建缓存功能
