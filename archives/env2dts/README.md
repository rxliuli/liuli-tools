# @liuli-util/env2dts

## 简介

扫描 dts 配置文件，将之写入到类型定义中，以便使用 ts 进行提示和检查。

## 使用

安装

```shell
yarn add -D @liuli-util/env2dts
```

在需要生成 dts 的文件中添加标记，生成的 dts 会在标记之间

```ts
// types/global.d.ts
declare interface ViteEnv {
  //region env2dts
  //endregion env2dts
}
```

在 package.json 中添加 script

```shell
env2dts -o types/global.d.ts
```

## 动机

我们希望在代码中使用环境变量时能够有提示和检查，所以我们一般要手动将环境变量写到类型定义中，不同的脚手架可能有不同的写法。

## FAQ

### 为什么仅生成 `[环境变量名]?: string`

1. 因为实际上我们无法推断复杂的环境变量类型，所以只能默认为 string，但也支持手动修改，我们将不会覆盖
2. 我们认为环境变量是可填可不填的，所以认为它可能为空
