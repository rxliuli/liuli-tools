import { BaseCommand, WorkspaceRequiredError } from '@yarnpkg/cli'
import { Option } from 'clipanion'
import { Configuration, Project, structUtils } from '@yarnpkg/core'
import {
  CacheWorkspace,
  listChangedWorkspaces,
} from '../utils/listChangedWorkspaces'
import { FilterOptions, filterWorkspaces } from '../utils/filterWorkspaces'
import ora from 'ora'

export abstract class FilterCommand
  extends BaseCommand
  implements FilterOptions
{
  commandName: string = Option.String()
  args: string[] = Option.Proxy()

  include?: string[] = Option.Array('--include')
  exclude?: string[] = Option.Array('--exclude')

  async listWorkspaces(project: Project): Promise<CacheWorkspace> {
    const include = this.include || []
    const exclude = this.exclude || [
      structUtils.stringifyIdent(
        project.getWorkspaceByCwd(project.cwd).locator,
      ),
    ]
    const cmd = [this.commandName, ...this.args].join(' ')
    const res = await listChangedWorkspaces({
      project,
      cmd: cmd,
      exclude,
      include,
    })
    res.workspaces = filterWorkspaces({
      workspaces: res.workspaces,
      include,
      exclude,
    })
    // console.log('filter: ', cmd, res.workspaces.length);
    return res
  }

  async main(): Promise<CacheWorkspace | null> {
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
      return null
    }
    spinner.stopAndPersist({
      text: `计算得到变更的模块: 
${changed.workspaces
  .map((item) => structUtils.stringifyIdent(item.locator))
  .join('\n')}`,
    })

    return changed
  }
}
