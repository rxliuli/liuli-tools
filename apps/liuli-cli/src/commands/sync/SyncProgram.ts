import { readFile, readJson, writeFile, writeJson } from 'fs-extra'
import path from 'path'
import { merge } from 'lodash'
import { PackageJson } from 'type-fest'
import prettier from '@liuli-util/prettier-standard-config/package.json'
import eslintTs from '@liuli-util/eslint-config-ts/package.json'
import eslintReactTs from '@liuli-util/eslint-config-react-ts/package.json'
import commitlint from '@liuli-util/commitlint-standard-config/package.json'
import { prompt } from 'enquirer'
import { isIncludeDep, isNpmPackage, isYarnRoot, isYarnSubModule } from './when'
import { appendScript, arrayToMap, AsyncArray } from '../../utils'
import { PathUtil } from '../../PathUtil'

export async function mergeJson(base: string, json: object): Promise<void> {
  const pkgJsonFilePath = path.resolve(base, './package.json')
  await writeJson(pkgJsonFilePath, merge(await readJson(pkgJsonFilePath), json), {
    spaces: 2,
  })
}

export type SyncConfigType =
  | 'prettier'
  | 'commitlint'
  | 'simplehooks'
  | 'workspaces'
  | 'gitignore'
  | 'eslint-ts'
  | 'eslint-vue-ts'
  | 'eslint-react-ts'
  | 'jest'

export interface SyncConfig {
  type: SyncConfigType
  handler(): Promise<void>
  when?(): Promise<boolean>
}

export class SyncProgram {
  constructor(private readonly base: string) {}
  private syncConfigs: SyncConfig[] = [
    {
      type: 'workspaces',
      handler: async () => {
        const pkgPath = path.resolve(this.base, './package.json')
        const lernaPath = path.resolve(this.base, 'lerna.json')
        const pkgJson = (await readJson(pkgPath)) as { workspaces: string[] }
        const lernaJson = await readJson(lernaPath)
        lernaJson.packages = pkgJson.workspaces
        await writeJson(lernaPath, lernaJson, {
          spaces: 2,
        })
      },
      when: isYarnRoot,
    },
    {
      type: 'prettier',
      handler: async () => {
        await mergeJson(this.base, {
          prettier: '@liuli-util/prettier-standard-config',
          devDependencies: {
            prettier: '^2.3.2',
            '@liuli-util/prettier-standard-config': `^${prettier.version}`,
          },
        } as PackageJson)
      },
      async when(): Promise<boolean> {
        return (await isNpmPackage()) && ((await isYarnRoot()) || !(await isYarnSubModule()))
      },
    },
    {
      type: 'commitlint',
      handler: async () => {
        await mergeJson(this.base, {
          'simple-git-hooks': {
            'commit-msg': 'yarn commitlint --edit $1',
          },
          commitlint: {
            extends: ['@liuli-util/commitlint-standard-config'],
          },
          devDependencies: {
            '@commitlint/cli': '^12.1.4',
            '@liuli-util/commitlint-standard-config': `^${commitlint.version}`,
          },
        } as PackageJson)
      },
      async when(): Promise<boolean> {
        return (await isNpmPackage()) && ((await isYarnRoot()) || !(await isYarnSubModule()))
      },
    },
    {
      type: 'gitignore',
      handler: async () => {
        const gitignorePath = path.resolve(this.base, '.gitignore')
        await writeFile(gitignorePath, await readFile(path.resolve(PathUtil.RootPath, '_gitignore'), 'utf-8'))
      },
    },
    {
      type: 'eslint-ts',
      handler: async () => {
        await mergeJson(this.base, {
          eslintConfig: {
            extends: ['@liuli-util/eslint-config-ts'],
          },
          devDependencies: {
            '@liuli-util/eslint-config-ts': `^${eslintTs.version}`,
          },
        } as PackageJson)
      },
      async when(): Promise<boolean> {
        return (await isNpmPackage()) && !(await isIncludeDep(['vue'])) && !(await isIncludeDep(['react']))
      },
    },
    {
      type: 'eslint-react-ts',
      handler: async () => {
        await mergeJson(this.base, {
          eslintConfig: {
            extends: ['@liuli-util/eslint-config-react-ts'],
          },
          devDependencies: {
            '@liuli-util/eslint-config-react-ts': `^${eslintReactTs.version}`,
          },
        } as PackageJson)
      },
      async when(): Promise<boolean> {
        return (await isNpmPackage()) && (await isIncludeDep(['react']))
      },
    },
    {
      type: 'jest',
      handler: async () => {
        await mergeJson(this.base, {
          jest: {
            preset: 'ts-jest',
            testMatch: ['<rootDir>/src/**/__tests__/*.test.ts'],
          },
          devDependencies: {
            jest: '^27.4.3',
            'ts-jest': '^27.0.7',
          },
        })
      },
    },
    //必须放到最后一个，后续根据检测结果添加 hooks
    {
      type: 'simplehooks',
      handler: async () => {
        const json = await readJson(path.resolve(this.base, './package.json'))
        const lintStaged: string[] = []
        if (json.prettier) {
          lintStaged.push('prettier --write')
        }
        if (json.eslintConfig) {
          lintStaged.push('eslint --fix')
        }
        let config = {
          scripts: {
            postinstall: appendScript(json?.scripts?.postinstall, 'npx simple-git-hooks'),
          },
          'simple-git-hooks': {
            'pre-commit': 'yarn lint-staged',
          },
          'lint-staged': {
            '*.{ts,tsx,js,jsx,css,vue}': [...lintStaged, 'git add'],
          },
          devDependencies: {
            'simple-git-hooks': '^2.5.1',
            'lint-staged': '^11.1.1',
          },
        }
        if (json.commitlint) {
          config = merge(config, {
            'simple-git-hooks': {
              'commit-msg': 'yarn commitlint --edit $1',
            },
          })
        }
        await mergeJson(this.base, config as PackageJson)
      },
      async when(): Promise<boolean> {
        return (await isNpmPackage()) && ((await isYarnRoot()) || !(await isYarnSubModule()))
      },
    },
  ]

  async sync(): Promise<void> {
    const { sync } = (await readJson(path.resolve(this.base, 'package.json'))) as {
      sync?: SyncConfigType[]
    }
    if (!sync) {
      return
    }
    const syncConfigs = this.syncConfigs.filter((config) => sync.includes(config.type))
    for (const syncConfig of syncConfigs) {
      await syncConfig.handler()
    }
  }

  async init(): Promise<void> {
    const configMap = arrayToMap(
      await AsyncArray.filter(this.syncConfigs, async (config) => {
        if (!config.when) {
          return true
        }
        return await config.when()
      }),
      (item) => item.type,
    )
    const res = await prompt<{
      sync: string[]
    }>({
      type: 'multiselect',
      message: '请选择需要同步的配置项',
      name: 'sync',
      choices: [...configMap.keys()],
    })
    await mergeJson(this.base, {
      sync: res.sync,
    })
  }
}
