import { Command } from 'commander'
import { build } from './build'
import { test } from './test'
import { addCliBanner } from './addCliBanner'
import { clean } from './clean'
import { addHusky } from './addHusky'

const main = new Command('liuli-cli')
main
  .addCommand(new Command('build').description('打包').action(build))
  .addCommand(new Command('clean').description('清理').action(clean))
  .addCommand(new Command('test:unit').description('单元测试').action(test))
  .addCommand(
    new Command('addCliBanner')
      .description('为 cli 添加 banner')
      .action(addCliBanner),
  )
  .addCommand(
    new Command('addHusky')
      .description('添加 git 钩子（beta）')
      .action(addHusky),
  )
  .parse()
