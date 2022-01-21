import { Command } from 'commander'
import path from 'path'
import { buildYarnPlugin } from './index'
import { readJson } from 'fs-extra'
import { PackageJson } from 'type-fest'

new Command()
  .addCommand(
    new Command('build').option('-w,--watch', 'watch mode').action(async () => {
      const json = (await readJson(path.resolve('package.json'))) as PackageJson
      let org: string, name: string
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const pkgName = json.name!
      if (pkgName.includes('/')) {
        ;[org, name] = pkgName.split('/')
      } else {
        org = '@yarnpkg'
        name = pkgName
      }
      await buildYarnPlugin({
        base: path.resolve(),
        org,
        name,
      })
    }),
  )
  .parse()
