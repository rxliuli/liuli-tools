# @liuli-util/cli-simple-local-ci

## 动机

由于公司 ci 尚未完善，开发环境发布流程比较缓慢，所以希望有一个本地工具可以自动拉取、打包和部署指定服务，以此提供给其他人使用。

## 需求

- 支持配置基本的名称、git 地址、分支、目标地址、运行的命令
- 支持查询和修改当前正在运行的 job（基于 http server）

## 使用

```shell
npm i -g @liuli-util/cli-simple-local-ci
```

配置方法

```ts
interface StepConfig {
  cmd: string
  interval?: number
}

interface JobConfig {
  name: string
  cwd: string
  disable?: boolean
  steps: StepConfig[]
}
```

示例配置

```json
[
  {
    "name": "wiki server",
    "cwd": "C:/Users/rxliuli/Code/company/wiki-backup",
    "steps": [
      {
        "cmd": "git pull origin dev && yarn build",
        "interval": 300000
      },
      {
        "cmd": "live-server --port=5000 --no-browser .vitepress/dist"
      }
    ]
  }
]
```
