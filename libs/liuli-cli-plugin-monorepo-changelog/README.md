# @liuli-util/liuli-cli-plugin-changelog

## 简介

一个自动根据当前模块提交生成 changelog 的 cli 工具，同时默认集成到 liuli-cli 中。

## 动机

由于我们采用了 commitlint 规范化 git 提交信息，所以也希望能够根据 git 信息自动生成 changelog。社区中虽然已有非常多的工具，但仍不能满足我们的需求。

我们的需求

- 根据当前模块的 git 提交历史生成 changelog
- 基于 git 提交的 type 进行分组

下面是调研的一些工具基本上都无法满足第一条，即设计时没有考虑在 monorepo 中的使用

- [changelog-version](https://github.com/AlbertoFdzM/changelog-version)
- [standard-version](https://github.com/conventional-changelog/standard-version)
