import * as path from 'path'
import { parse, stringify } from 'yaml'
import { pathExists, readFile, writeFile } from 'fs-extra'
import { uniq } from 'lodash'
import { execPromise } from './utils/execPromise'

interface MigrationYarn2PlusConfig {
  basePath: string
}

export class MigrationYarn2Plus {
  constructor(private readonly config: MigrationYarn2PlusConfig) {}
  async setVersion(): Promise<void> {
    await execPromise('yarn set version berry', {
      cwd: path.resolve(this.config.basePath),
    })
  }

  async updateYaml(): Promise<void> {
    const configPath = path.resolve(this.config.basePath, '.yarnrc.yml')
    const str = await readFile(configPath, 'utf-8')
    const config = parse(str)
    const res = stringify({
      ...config,
      compressionLevel: 0,
      enableGlobalCache: true,
      nodeLinker: 'node-modules',
    })
    await writeFile(configPath, res)
  }

  async updateGitIgnore(): Promise<void> {
    const configPath = path.resolve(this.config.basePath, '.gitignore')
    let config: string
    if (await pathExists(configPath)) {
      config = await readFile(configPath, 'utf-8')
    } else {
      config = `
node_modules
yarn-error.log
.idea
.vscode
.history
*.tgz
.temp/
.cache/
      `
    }
    const append = `
    .yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
.pnp.*
`
    const res = uniq(
      (config + append).split('\n').filter((item) => item.length !== 0),
    ).join('\n')
    await writeFile(configPath, res)
  }

  async install(): Promise<void> {
    await execPromise('yarn install', {
      cwd: this.config.basePath,
    })
  }
}
