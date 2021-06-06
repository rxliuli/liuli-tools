# @liuli-util/shell

## 简介

在一个 cli 中包含所有常用的 unix\* 命令。

## 使用

```shell
yarn add -D @liuli-util/shell
```

命令

- mkdir: 递归创建目录
- rm: 删除文件或目录
- cp: 复制任意文件或目录到指定目录中
- mv: 移动任意文件或目录到指定目录中
  > 当要移动的文件只有一个且目标文件不存在，将会重命名而非移动。

示例

```shell
mkdir dist/
rm dist/
cp README.md CNAME dist/
mv images/ dist/
```

## FAQ

### 为什么要重复造轮子？

因为目前已有工具都不能满足需求

- rimraf: 删除指定目录
- copyfiles: 复制文件
- shx: 使用 nodejs 实现 shell 命令

主要的不同点在于我们默认覆盖了一些系统命令而非重新创建一个命令，同时增强原生命令的功能。

| 对比             | @liuli-util/shell | shx     |
| ---------------- | ----------------- | ------- |
| 是否包含常用命令 | 是                | 是      |
| 是否覆盖系统命令 | 是                | 否      |
| 是否增强命令     | 是                | 否      |
| 底层依赖         | fs-extra          | shelljs |

### 为什么全局安装没有覆盖系统命令？

由于环境变量的加载顺序导致无法覆盖，你应该在项目级别使用它。
