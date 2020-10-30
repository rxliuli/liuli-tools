# 日常使用的 JavaScript 工具库

> [rx-util](https://github.com/rxliuli/rx-util) 与大名鼎鼎的 [rx-（rxjs/rxjava/...）系列](https://github.com/ReactiveX/) 没有任何关系，仅仅只是吾辈用户名（**rxliuli**）的前两位而已，请勿误解！

[![npm](https://img.shields.io/npm/v/rx-util.svg?color=red&label=npm)](https://www.npmjs.com/package/rx-util) [![esdoc](https://img.shields.io/badge/document-98%25-brightgreen.svg)](https://rx-util.rxliuli.com/) [![coverage](https://img.shields.io/badge/coverage-86%25-informational.svg)](https://rx-util.rxliuli.com/coverage/lcov-report/) [![license-MIT-blue](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[贡献指南](https://github.com/rxliuli/rx-util/blob/master/CONTRIBUTING.md)

## 简介

[English](https://github.com/rxliuli/rx-util/blob/master/readme.md) [简体中文](https://github.com/rxliuli/rx-util/blob/master/readme-zh-cn.md)

吾辈日常写传统前端时需要大量相同的函数，所以需要写一个能在浏览器上使用的库，仅此而已。
该库大部分代码已经通过单元测试，但还请谨慎用于生产环境。不包含单元测试的部分大部分是 DOM 操作相关函数，以及部分异步代码。
如果在使用中遇到了什么问题，欢迎提 [issue](https://github.com/rxliuli/rx-util/issues)，或者 [PR](https://github.com/rxliuli/rx-util/pulls) 亦可。

> 1.7.0 之后的版本使用 TypeScript 进行了重构，如果需要参考 JavaScript 版本的话请查看 TypeScript 打包后生成的 [rx-util.js](https://github.com/rxliuli/rx-util/blob/master/dist/rx-util.js)，人类可读代码！

## 使用

### 浏览器

下载 [rx-util.min.js](https://github.com/rxliuli/rx-util/raw/master/dist/rx-util.min.js)，然后在 HTML 中引入即可

```html
<script src="https://github.com/rxliuli/rx-util/raw/master/dist/rx-util.min.js"></script>
```

开发环境更建议使用 [rx-util.js](https://github.com/rxliuli/rx-util/raw/master/dist/rx-util.js)，包含未压缩的代码及全部的注释内容。

### 现代前端

如果使用了现代前端构建工具（真实项目未使用，但吾辈测试可用），也可以安装到项目中。

yarn

```sh
yarn add rx-util
```

或者 npm

```sh
npm i rx-util
```

然后使用命名导入即可

```js
import { dateFormat } from 'rx-util'
```

或者

```js
import * as rx from 'rx-util'
```
