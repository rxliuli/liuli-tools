# @liuli-util/cli

> [中文](https://github.com/rxliuli/liuli-tools/tree/master/apps/liuli-cli/README.zh-CN.md)

A zero-configuration CLI for packaging libraries and CLI applications.

## Getting Started

### Install

```sh
pnpm i -D @liuli-util/cli # Local installation
pnpm i -g @liuli-util/cli # global install
```

### Packages

```sh
liuli-cli build lib # Package the library
liuli-cli build cli # Package cli references
```

> Adding the `-w` option starts the rollup monitoring mode, the dist/ will not be compressed and the dependencies will not be added to the bundle.

![watchdog mode](https://liuli.dev/images/liuli-cli%20%E7%9B%91%E8%A7%86%E6%A8%A1%E5%BC%8F.gif)

### Generate

```sh
liuli-cli generate <name> --template lib # Generate ts-lib project
liuli-cli generate <name> --template cli # generate cli project
```

util also supports interactive project creation

```shell
liuli-cli generate
```

![liuli-cli interactive creation screenshot](https://liuli.dev/images/liuli-cli%20%E4%BA%A4%E4%BA%92%E5%BC%8F%E5%88%9B%E5%BB%BA%E6%88%AA%E5%9B%BE.gif)

### Deployment

Support for deploying front-end resources to a remote location via sftp/gh-pages, with configuration information in the `deploy` field in package.json

```sh
liuli deploy
```

public

| configuration | description                       | defaults |
| ------------- | --------------------------------- | -------- |
| ``type`       | deployment type, ``sftp/gh-pgaes` | none     |
| `dist`        | Static resource directory         | None     |
| `dest`        | deployed remote directory         | none     |

sftp

| configuration        | description       | defaults |
| -------------------- | ----------------- | -------- |
| `sshConfig.host`     | ip address of ssh |          |
| `sshConfig.port`     | ssh's port number | 22       |
| `sshConfig.username` | ssh's username    |          |

gh-pages

| configuration     | description                               | default                                 |
| ----------------- | ----------------------------------------- | --------------------------------------- |
| `repo?: string`   | the git address of the project to push to | the default is the current project      |
| `remote?: string` | push remote                               | defaults to origin                      |
| `branch?: string` | remote branch name                        | defaults to gh-pages                    |
| `add?: boolean`   | whether to push incrementally             | cleans up the dest directory by default |

Example configuration for deploying a vuepress documentation site

```json
{
  "deploy": {
    "type": "gh-pages",
    "dist": "docs/.vuepress/dist"
  }
}
```

### Sync configuration

```shell
liuli-cli sync
```

You need to specify which configuration to sync in package.json

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

Future goals: By default, this will include checking the cli's own sync (if it needs to be used outside of monorepo), eslint/style-lint, and interactive cli when not configured

> Note: Currently, only dependencies are synchronized and no installation is performed

Interactive initialization of synchronized configuration is also supported

```shell
liuli-cli sync init
```

## Design philosophy

- Conventions outweigh configuration and should be left out if possible. VitePress does the same thing, see: https://vitepress.vuejs.org/#lighter-page-weight This leads to a number of constraints, including the following
  - The entry file must be `src/index.ts` when packaging the library, and the exit file must be `dist/index.esm.js` and `dist/index.js`
  - The entry file must be `src/bin.ts` and the exit file is `dist/bin.js` when packaging the CLI.
  - When packaging lib, all dependencies are treated as external dependencies, while when packaging cli, all dependencies are typed into the bundle

## FAQ

### Why not bundle external dependencies

The main reason is that we want to leave the bundling to the final application, to avoid bundling the same dependencies over and over again, and to avoid dealing with the problem of using `worker_threads` directly on the filesystem in nodejs.
