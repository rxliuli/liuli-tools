import { Command } from 'commander'
import { ShellProgram } from './index'

export const removeCmd = new Command('rm')
  .action(async (_options, cmd) => {
    await ShellProgram.remove(cmd.args)
  })
  .description('删除文件或目录')

export const copyCmd = new Command('cp')
  .action(async (_options, cmd) => {
    await ShellProgram.copy(cmd.args)
  })
  .description('复制文件或目录')

export const moveCmd = new Command('mv')
  .action(async (_options, cmd) => {
    await ShellProgram.move(cmd.args)
  })
  .description('移动文件或目录')

export const mkdirCmd = new Command()
  .command('mkdir')
  .action(async (_options, cmd) => {
    await ShellProgram.mkdir(cmd.args)
  })
  .description('递归创建目录')
