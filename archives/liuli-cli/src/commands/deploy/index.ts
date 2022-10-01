import { Command } from 'commander'
import { deploy } from './deploy'
import * as path from 'path'

export const deployCommand = new Command('deploy')
  .description('部署项目到远端')
  .option('--debug', '是否开启调试模式')
  .action((options: { debug?: boolean }) =>
    deploy({
      cwd: path.resolve(),
      debug: !!options.debug,
    }),
  )
