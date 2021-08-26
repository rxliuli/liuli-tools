# CHANGELOG

## 0.1.0

- chore: 删除 list 命令的 --json 参数
- feat: 支持使用 list 命令查询构建缓存，修建缓存的 key，仅保存实际执行的命令
- chore: 升级 clipanion3，放弃使用注解
- perf: 优化查询缓存的性能（主要是 git 查找）
- feat: 基本实现构建缓存功能
