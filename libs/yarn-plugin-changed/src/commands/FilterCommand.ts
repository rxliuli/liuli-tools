import { BaseCommand } from '@yarnpkg/cli'
import { Option } from 'clipanion'
import { Project, structUtils } from '@yarnpkg/core'
import {
  CacheWorkspace,
  listChangedWorkspaces,
} from '../utils/listChangedWorkspaces'

export abstract class FilterCommand extends BaseCommand {
  include?: string[] = Option.Array('--include')

  exclude?: string[] = Option.Array('--exclude')

  protected async listWorkspaces(project: Project): Promise<CacheWorkspace> {
    const res = await listChangedWorkspaces(project, process.argv.join(' '))
    // console.log('changed.workspaces: ', res.workspaces)
    const include = this.include || []
    const exclude = this.exclude || []

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
