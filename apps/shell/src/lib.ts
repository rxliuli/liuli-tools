import { Command } from 'commander'
import { copy, mkdirp, move, remove, rename } from 'fs-extra'
import path from 'path'

export const removeCmd = new Command()
  .command('rm <...files>')
  .action(async (_1, _2, cmd) => {
    await Promise.all(
      (cmd.args as string[]).map((file) => remove(path.resolve(file))),
    )
  })
  .description('删除文件或目录')

export const copyCmd = new Command()
  .command('cp <...sources> <dest>')
  .action(async (_1, _2, cmd) => {
    const args = cmd.args as string[]
    const sources = args.slice(0, args.length - 1)
    const dest = args[args.length - 1]
    await Promise.all(
      sources.map((source) => copy(path.resolve(source), path.resolve(dest))),
    )
  })
  .description('复制文件或目录')

export const moveCmd = new Command()
  .command('mv <...sources> <dest>')
  .action(async (_1, _2, cmd) => {
    const args = cmd.args as string[]
    const sources = args.slice(0, args.length - 1)
    const dest = args[args.length - 1]
    if (sources.length === 1) {
      await rename(path.resolve(sources[0]), path.resolve(dest))
      return
    }
    await Promise.all(
      sources.map((source) => move(path.resolve(source), path.resolve(dest))),
    )
  })
  .description('移动文件或目录')

export const mkdirCmd = new Command()
  .command('mkdir <...dirs>')
  .action(async (_1, _2, cmd) => {
    const args = cmd.args as string[]
    await Promise.all(args.map((source) => mkdirp(path.resolve(source))))
  })
  .description('递归创建目录')
