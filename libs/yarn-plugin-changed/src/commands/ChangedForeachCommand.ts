import { FilterCommand } from './FilterCommand'
import { Command } from 'clipanion'
import { Configuration, Project, structUtils } from '@yarnpkg/core'
import { WorkspaceRequiredError } from '@yarnpkg/cli'
import ora from 'ora'

export class ChangedForeachCommand extends FilterCommand {
  @Command.String()
  commandName!: string

  @Command.Proxy()
  args: string[] = []

  @Command.Boolean('-v,--verbose')
  verbose = false

  @Command.Boolean('-p,--parallel')
  parallel = false

  @Command.Boolean('-i,--interlaced')
  interlaced = false

  @Command.Boolean('-t,--topological')
  topological = false
  @Command.Boolean('--topological-dev')
  topologicalDev = false

  @Command.String('-j,--jobs')
  jobs?: number

  public static usage = Command.Usage({
    description: 'Run a command on changed workspaces and their dependents',
    details: `
      This command will run a given sub-command on changed workspaces and workspaces depends on them.

      Check the documentation for \`yarn workspace foreach\` for more details.
    `,
    examples: [
      [
        'Run build scripts on changed workspaces',
        'yarn changed foreach run build',
      ],
      [
        'Find changed files within a Git range',
        'yarn changed foreach --git-range 93a9ed8..4ef2c61 run build',
      ],
    ],
  })

  @Command.Path('changed', 'foreach')
  public async execute(): Promise<number> {
    const configuration = await Configuration.find(
      this.context.cwd,
      this.context.plugins,
    )
    const { project, workspace } = await Project.find(
      configuration,
      this.context.cwd,
    )

    if (!workspace) {
      throw new WorkspaceRequiredError(project.cwd, this.context.cwd)
    }

    const spinner = ora({
      color: 'blue',
    })
    spinner.start('开始计算变更的模块')
    const changed = await this.listWorkspaces(project)
    if (!changed.workspaces.length) {
      spinner.stopAndPersist({
        text: '没有变更的模块',
      })
      return 0
    }
    spinner.stopAndPersist({
      text: `计算得到变更的模块: 
${changed.workspaces
  .map((item) => structUtils.stringifyIdent(item.locator))
  .join('\n')}`,
    })

    const res = await this.cli.run(
      [
        'workspaces',
        'foreach',
        ...changed.workspaces.reduce(
          (acc, ws) => [
            ...acc,
            '--include',
            structUtils.stringifyIdent(ws.locator),
          ],
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
      ],
      {
        cwd: project.cwd,
      },
    )
    await changed.updateCache()
    return res
  }
}
