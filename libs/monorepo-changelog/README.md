# @liuli-util/monorepo-changelog

## 简介

一个自动根据当前模块提交生成 changelog 的 cli 工具。

## 使用

```shell
#安装依赖
yarn add -D @liuli-util/monorepo-changelog
#生成日志
yarn changelog
```

## 格式

```md
# CHANGELOG

## <version>

<!--hash:<hash>-->

- commit 1
- commit 2
- others commit...

...other version
```

## FAQ

### 动机

由于我们采用了 commitlint 规范化 git 提交信息，所以也希望能够根据 git 信息自动生成 changelog。社区中虽然已有非常多的工具，但仍不能满足我们的需求。

我们的需求

- 根据当前模块的 git 提交历史生成 changelog
- 基于 git 提交的 type 进行分组

下面是调研的一些工具基本上都无法满足第一条，即设计时没有考虑在 monorepo 中的使用

- [changelog-version](https://github.com/AlbertoFdzM/changelog-version)
- [standard-version](https://github.com/conventional-changelog/standard-version)

### 如何兼容之前手写的 CHANGELOG

例如以前的 changelog 可能是这样的

```md
# CHANGELOG

## 0.1.0

- 实现基本功能
```

只需要在最后一个版本添加当时的 git commit hash 即可

```md
# CHANGELOG

## 0.1.0

<!--hash:ca27f54052240ac3a68ff3dbbe171107b8c4dc37-->

- 实现基本功能
```
