import { FilterCommand } from './FilterCommand'
import { Command, Option } from 'clipanion'
import { structUtils } from '@yarnpkg/core'
import chalk from 'chalk'

export class ChangedForeachCommand extends FilterCommand {
  verbose = Option.Boolean('-v,--verbose', false)
  parallel = Option.Boolean('-p,--parallel', false)
  interlaced = Option.Boolean('-i,--interlaced', false)
  topological = Option.Boolean('-t,--topological', false)
  topologicalDev = Option.Boolean('--topological-dev', false)
  jobs?: number = Option.String('-j,--jobs')

  public static usage = Command.Usage({
    description: '基于 git 计算变更的模块，然后仅运行变更的模块',
    examples: [
      ['按照依赖图在所有模块中运行 initialize 初始化命令', 'yarn changed foreach -p --topological-dev run initialize'],
    ],
  })

  static paths = [['changed', 'foreach']]

  async execute(): Promise<number | void> {
    const changed = await this.main()
    if (changed === null) {
      return
    }
    const strings = [
      'workspaces',
      'foreach',
      ...changed.workspaces.reduce(
        (acc, ws) => [...acc, '--include', structUtils.stringifyIdent(ws.locator)],
        [] as string[],
      ),
      ...(this.verbose ? ['--verbose'] : []),
      ...(this.parallel ? ['--parallel'] : []),
      ...(this.interlaced ? ['--interlaced'] : []),
      ...(this.topological ? ['--topological'] : []),
      ...(this.topologicalDev ? ['--topological-dev'] : []),
      ...(this.jobs ? ['--jobs', `${this.jobs}`] : []),
      this.commandName,
      ...this.args,
    ]
    // console.log('execute before: ', strings.join(' '))
    const res = await this.cli.run(strings, this.context)
    // console.log('execute after: ', res)
    if (res === 0) {
      await changed.updateCache()
      console.log(chalk.green('运行完成'))
    } else {
      console.log(chalk.red('运行失败'))
    }
    return res
  }
}
