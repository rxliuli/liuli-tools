import { Command } from 'commander'
import { deploy } from './deploy'
import * as path from 'path'

export const deployCommand = new Command('deploy')
  .description('部署项目到远端')
  .action(() => deploy({ cwd: path.resolve() }))
