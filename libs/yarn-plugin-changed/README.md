# @liuli-util/yarn-plugin-changed

## 简介

基于 git 和文件 hash 计算缓存，确保每次运行相同的命令仅会在变更的模块中实际运行。

## 使用

安装

```shell
yarn plugin import https://liuli-tools.rxliuli.com/yarn-plugin-changed/%40liuli-util/plugin-changed.js
```

功能

- `yarn changed foreach <args>`: 根据缓存执行命令
- `yarn changed list <args>`: 查询指定命令的缓存情况

## 基本思路

- 根据依赖尽可能地并发运行命令
- 对命令进行缓存，下次运行相同命令根据缓存决定跳过哪些模块

1. 获取所有模块
2. 从缓存文件中获取上次构建的结果
3. 对比需要重新构建的模块以及依赖它的上层模块
4. 重新构建这些模块

缓存文件中应该是一个键值对 **命令 => 缓存结果**

- 构建模块列表
- 模块的 git 记录（如果存在未提交的文件，则额外计算 git 提交文件记录的哈希值）

## 开发

1. 启动开发环境 `cd packages/common/yarn-plugin-changed && yarn dev`
2. 安装打包后的插件 `yarn plugin import ./bundles/\@liuli-util/plugin-changed.js`

## 参考

- [ultra-runner](https://github.com/folke/ultra-runner): 不绑定 git 使用文件哈希的方式对比差异，但不支持忽略 node_modules 的变更（git 忽略的文件应该都要被忽略才对）导致缓存几乎不可能生效
- [yarn.build](https://yarn.build/): 不支持自定义运行的命令，而且缓存方面也存在问题
- [yarn plugin changed](https://github.com/Dcard/yarn-plugins/tree/master/packages/changed): 不支持按照开发时依赖并行构建，而且 cli 存在一些问题
