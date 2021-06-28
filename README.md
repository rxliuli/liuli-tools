# 日常使用的 TypeScript 工具库

[![npm](https://img.shields.io/npm/v/@liuli-util/async.svg?color=red&label=npm)](https://www.npmjs.com/org/liuli-util) [![doc](https://img.shields.io/badge/document-98%25-brightgreen.svg)](https://liuli-utils.rxliuli.com/) [![license-MIT-blue](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 简介

吾辈使用的工具函数库，按照功能分割成不同的模块，都发布在 [@liuli-util](https://www.npmjs.com/org/liuli-util) 组织下，可以单独引入指定模块。

## 变革

大约在 2018 年下半年，吾辈创建了这个工具库项目，初衷非常简单：**吾辈日常写传统前端时需要大量相同的函数，所以需要写一个能在浏览器上使用的库，仅此而已。**。时光荏苒，吾辈已经从一个后端开发变为前端开发，这个项目中包含的功能越来越多，在项目中的引入成本逐渐变高，甚至到了 nodejs 项目无法引入的程度 -- 即便有许多功能是环境无关的。

所以这次升级 2.0 希望解决的几个问题如下

- [x] 清理不需要的功能
- [x] 使用 monorepo 增强项目的可维护性
- [x] 修改项目的名字（rx-util 看起来很像 [rx.js](https://rxjs-dev.firebaseapp.com/guide/overview) 相关的工具包）
- [ ] 使用 monorepo 分割打包减小在项目中的引入成本 -- babel 的 567 三个版本转变的惨剧历历在目
- [ ] 找到对用户更友好的使用方式 `class vs function` -- 面向对象 vs 函数式

## 许可证

[MIT](./LICENSE)
