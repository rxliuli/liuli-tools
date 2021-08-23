import { BaseCommand } from '@yarnpkg/cli'
import { Command } from 'clipanion'
import { Project, structUtils } from '@yarnpkg/core'
import {
  CacheWorkspace,
  listChangedWorkspaces,
} from '../utils/listChangedWorkspaces'
import { FilterOptions, filterWorkspaces } from '../utils/filterWorkspaces'

export abstract class FilterCommand
  extends BaseCommand
  implements FilterOptions
{
  @Command.Array('--include')
  include?: string[]

  @Command.Array('--exclude')
  exclude?: string[]

  protected async listWorkspaces(project: Project): Promise<CacheWorkspace> {
    const res = await listChangedWorkspaces({
      project: project,
      cmd: process.argv.join(' '),
    })
    // console.log('changed.workspaces: ', res.workspaces)
    const include = this.include || []
    const exclude = this.exclude || [
      structUtils.stringifyIdent(
        project.getWorkspaceByCwd(project.cwd).locator,
      ),
    ]
    res.workspaces = filterWorkspaces({
      workspaces: res.workspaces,
      include,
      exclude,
    })
    return res
  }
}
