# @liuli-util/commitlint-standard-config

## 简介

在个人项目中统一 commitlint 的配置，将之封装为 npm 包（实验性）。

## 使用

安装依赖

```shell
yarn add -D @liuli-util/commitlint-standard-config
```

在 `package.json` 中配置

```json
{
  "eslintConfig": {
    "extends": ["@liuli-util/commitlint-standard-config"]
  }
}
```
