import path from 'path'
import { pathExists, readJson, writeJson } from 'fs-extra'
import { ModuleHash } from './calcModuleHash'
import { NativePath } from '@yarnpkg/fslib'

export type WorkspaceCacheInfo = ModuleHash & { cwd: NativePath }

/**
 * 构建相关的缓存
 */
export class BuildCache {
  constructor(public readonly rootPath: string) {
    this.cachePath = path.resolve(this.rootPath, '.yarn-cache.json')
  }

  private readonly cachePath: string

  async get(cmd: string): Promise<WorkspaceCacheInfo[]> {
    const json = await this.readCache()
    return json[cmd] ?? []
  }

  async set(cmd: string, workspaces: WorkspaceCacheInfo[]) {
    const json = await this.readCache()
    json[cmd] = workspaces
    await writeJson(this.cachePath, json)
  }

  private async readCache() {
    if (!(await pathExists(this.cachePath))) {
      await writeJson(this.cachePath, {})
    }
    return await readJson(this.cachePath)
  }
}
