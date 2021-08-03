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

### cp/mv 命令的行为似乎有点奇怪？

1. 源文件只有一个
   1. 目标位置存在，则复制文件到目录下。例如 `cp public dist/` 则会将 public 复制到 dist/public
   2. 目标位置不存在，则将之复制并重命名到指定位置。例如 `cp public dist/static` 则会将 public 复制到 dist/static
2. 源文件有多个，则复制文件到目录下（如果不存在则自动创建）。例如 `cp public package.json dist/` 则会将 public,package.json 复制到 dist/ 目录
