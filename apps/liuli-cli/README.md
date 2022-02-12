# @liuli-util/cli

> [中文](https://github.com/rxliuli/liuli-tools/tree/master/apps/liuli-cli/README.zh-CN.md)

A zero-configuration CLI packaged for libraries and CLI applications.

## Getting started

### Install

```sh
yarn add -D @liuli-util/cli # local installation
npm i -g @liuli-util/cli # install globally
```

### Bale

```sh
yarn liuli-cli build lib # package library
yarn liuli-cli build cli # package cli reference program
```

> Add the `-w` option to start the watch mode of rollup, the packaged dist/ will not be compressed and the dependencies will not be included in the bundle.

![Monitor Mode](https://liuli.dev/images/liuli-cli%20%E7%9B%91%E8%A7%86%E6%A8%A1%E5%BC%8F.gif)

### Generate

```sh
yarn liuli-cli generate <name> --template lib # Generate ts-lib project
yarn liuli-cli generate <name> --template cli # Generate cli project
```

util also supports interactive project creation

```shell
yarn liuli-cli generate
```

![Liuli-cli interactively create screenshots](https://liuli.dev/images/liuli-cli%20%E4%BA%A4%E4%BA%92%E5%BC%8F%E5%88%9B %E5%BB%BA%E6%88%AA%E5%9B%BE.gif)

### Sync configuration

```shell
yarn liuli-cli sync
```

Which configuration needs to be synced in package.json

```json
{
  "sync": ["prettier", "workspaces", "commitlint", "simplehooks"]
}
```

Currently supported configuration items

- prettier
- commitlint
- simplehooks
- workspaces
- gitignore
- eslint-ts
- eslint-vue-ts
- jest

Future goals: By default will include checking the synchronization of the cli itself (if it needs to be used outside of a monorepo), eslint/style-lint etc., and implementing an interactive cli when not configured

> Note: Currently only the dependencies are synced and no installation is performed

Interactive initialization synchronization configuration is also supported

```shell
yarn liuli-cli sync init
```

## design concept

- Convention over configuration, configuration should not be provided if possible. VitePress does this too, reference: https://vitepress.vuejs.org/#lighter-page-weight This leads to some constraints, including the following
  - When packaging the library, the entry file must be `src/index.ts`, and the export file must be `dist/index.esm.js` and `dist/index.js`
  - When packaging the CLI, the entry file must be `src/bin.ts`, and the exit file must be `dist/bin.js`
  - All dependencies will be treated as external dependencies when packaging lib, and all dependencies will be bundled when packaging cli

## FAQ

### Why not bundle external dependencies

The main reason is that you want to leave the bundling work to the final application, avoid bundling the same dependencies repeatedly, and also avoid dealing with the problem of using `worker_threads` directly based on the file system in nodejs.
