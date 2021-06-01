import { Command } from 'commander'
import { test } from './test'
import { addCliBanner } from './addCliBanner'
import { clean } from './clean'
import { addHusky } from './addHusky'
import { buildCommand } from './commands/build'
import { initCommand } from './commands/init'

const main = new Command('liuli-cli')
main
  .addCommand(buildCommand)
  .addCommand(initCommand)
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
