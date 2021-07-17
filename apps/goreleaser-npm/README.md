# @liuli-util/goreleaser-npm

> 灵感来源于 [go-npm](https://github.com/sanathkr/go-npm)

简而言之，这是将 [go-releaser](https://github.com/goreleaser/goreleaser) 发布的 cli 快速发布到 npm 上的一个 cli 工具。

## 使用

安装

```shell
yarn add @liuli-util/goreleaser-npm
# or
npm i @liuli-util/goreleaser-npm
```

注意：这里必须作为运行时依赖

创建一个 `cli.js`

```js
#!/usr/bin/env node
require('@liuli-util/goreleaser-npm').forward()
```

配置

```json
{
  "scripts": {
    "postinstall": "goreleaser-npm install",
    "preuninstall": "goreleaser-npm uninstall"
  },
  "files": ["cli.js"],
  "goBin": {
    "name": "ebook-batch-converter",
    "version": "0.4.1",
    "url": "https://github.com/rxliuli/ebook-batch-converter/releases/download/v{{version}}/ebook-batch-converter_{{version}}_{{platform}}_{{arch}}.tar.gz"
  },
  "bin": {
    "ebook-batch-converter": "cli.js"
  },
  "dependencies": {
    "@liuli-util/goreleaser-npm": "*"
  }
}
```

> 参考示例项目 [goreleaser-npm-cli-example](../../examples/goreleaser-npm-cli-example)

## FAQ

### 为什么需要一个 cli.js

目前尚未找到直接在 `package.json/bin` 中动态引用二进制文件的方法，参考：[nodejs 怎么获取 node_modules/.bin 目录](https://segmentfault.com/q/1010000040362410)

### 为什么要作为运行时依赖

因为要在 `yarn install` 运行完成之后下载二进制程序，所以需要作为运行时依赖。
