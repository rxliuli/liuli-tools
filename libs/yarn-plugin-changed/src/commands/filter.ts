import { BaseCommand } from '@yarnpkg/cli'
import { Command } from 'clipanion'
import { Project, structUtils } from '@yarnpkg/core'
import {
  CacheWorkspace,
  listChangedWorkspaces,
} from '../utils/listChangedWorkspaces'

export abstract class FilterCommand extends BaseCommand {
  @Command.Array('--include')
  public include?: string[]

  @Command.Array('--exclude')
  public exclude?: string[]

  protected async listWorkspaces(project: Project): Promise<CacheWorkspace> {
    const res = await listChangedWorkspaces(project, process.argv.join(' '))
    // console.log('changed.workspaces: ', res.workspaces)
    const include = this.include || []
    const exclude = this.exclude || [
      structUtils.stringifyIdent(
        project.getWorkspaceByCwd(project.cwd).locator,
      ),
    ]

    res.workspaces = res.workspaces.filter((ws) => {
      const name = structUtils.stringifyIdent(ws.locator)

      if (name) {
        if (include.length && !include.includes(name)) {
          return false
        }

        if (exclude.length && exclude.includes(name)) {
          return false
        }
      }

      return true
    })
    return res
  }
}
