import { Command } from 'commander'
import { build } from './build'
import { test } from './test'
import { addCliBanner } from './addCliBanner'
import { clean } from './clean'
import { addHusky } from './addHusky'

const main = new Command('liuli-cli')
main
  .addCommand(
    new Command('build')
      .description('使用 rollup 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
      .action(build),
  )
  .addCommand(new Command('clean').description('清理 dist 目录').action(clean))
  .addCommand(
    new Command('test:unit')
      .description('运行所有单元测试（beta）')
      .action(test),
  )
  .addCommand(
    new Command('addCliBanner')
      .description('为 cli 添加 banner（dist/bin.js）')
      .action(addCliBanner),
  )
  .addCommand(
    new Command('addHusky')
      .description('添加 git 钩子（beta）')
      .action(addHusky),
  )
  .parse()
