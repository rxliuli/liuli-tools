# @liuli-util/esbuild-plugins

一系列 esbuild 的通用插件，主要是供 liuli-cli 打包 lib/cli/userjs 等使用，但也可以作为通用 lib 使用。

目前已经实现的功能

- autoExternal: 自动排除所有依赖
- env: 支持代码中使用环境变量
- log: 在监视模式下重新构建打印日志
- metafile: 导出构建的一些元数据以供后续分析
- nativeNodeModules: 处理 nodejs 原生模块
- raw: 支持通过 `?raw` 捆绑文本文件内容
- resolve: 重写导入的 import
- userJS: 支持捆绑 user.js
