# @liuli-util/yarn-plugin-builder

## 使用

1. 安装 `@liuli-util/yarn-plugin-builder`
2. 替换 script 中的 `builder` 命令为 `yarn-plugin-builder`

## FAQ

### 动机

@yarnpkg/builder 是官方提供打包 yarn 插件的工具，但它有两个烦人的问题

1. 基于 webpack 性能很慢（v3 正在使用 esbuild 改善这一点）
2. 不尊重项目本身的组织名，会被强行移至 _@yarnpkg/_ 组织下

所以我创建了这个 cli，修正了以上两点问题。
