# JavaScript tool library for everyday use

> [rx-util](https://github.com/rxliuli/rx-util) has nothing to do with the famous [rx series(rxjs/rxjava/...)](https://github.com/ReactiveX/) , just the first two of my user name(**rxliuli**), don't misunderstand!

[![npm](https://img.shields.io/npm/v/rx-util.svg?color=red&label=npm)](https://www.npmjs.com/package/rx-util) [![esdoc](https://img.shields.io/badge/document-98%25-brightgreen.svg)](https://rx-util.rxliuli.com/) [![coverage](https://img.shields.io/badge/coverage-86%25-informational.svg)](https://rx-util.rxliuli.com/coverage/lcov-report/) [![license-MIT-blue](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Contribution guide](https://github.com/rxliuli/rx-util/blob/master/CONTRIBUTING.md)

## Introduction

[English](https://github.com/rxliuli/rx-util/blob/master/readme.md) [简体中文](https://github.com/rxliuli/rx-util/blob/master/readme-zh-cn.md)

I need a lot of the same functions when writing a traditional front end every day, so I need to write a library that I can use on my browser, and that's it.
Most of the code in the library has passed unit testing, but please be cautious in production environments. Most of the parts that do not contain unit tests are DOM operation-related functions, as well as some asynchronous code.

> If you encounter any problems, please feel free to mention the [issue](https://github.com/rxliuli/rx-util/issues) , or [PR](https://github.com/rxliuli/rx-util/pulls) .

## Use

### Browser

Download [rx-util.min.js](https://github.com/rxliuli/rx-util/raw/master/dist/rx-util.min.js) and import it in HTML

```html
<script src="https://github.com/rxliuli/rx-util/raw/master/dist/rx-util.min.js"></script>
```

The development environment is more recommended to use [rx-util.js](https://github.com/rxliuli/rx-util/raw/master/dist/rx-util.js) with uncompressed code and all comment content.

### Modern front end

If you use a modern front-end build tool (real projects are not used, but our tests are available), you can also install them into your project.

yarn

```sh
yarn add rx-util
```

Or npm

```sh
npm i rx-util
```

Then use the named import to

```js
import { dateFormat } from 'rx-util'
```

or

```js
import * as rx from 'rx-util'
```
