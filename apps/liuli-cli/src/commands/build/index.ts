import { Command } from 'commander'
import { BuildProgram } from './BuildProgram'
import { loadTypeScriptConfig } from '../../utils'
import path from 'path'

const buildProgram = new BuildProgram()
export const buildCommand = new Command('build')
  .description('使用 rollup 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
  .action(async (option: { watch?: boolean; config?: true | string }) => {
    await buildProgram.buildPkg(!!option.watch)
  })
  .addCommand(
    new Command()
      .command('config')
      .description('根据 rollup.config.ts 配置打包')
      .option('-w --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        const options = loadTypeScriptConfig(
          path.resolve('rollup.config.ts'),
        ).default
        await buildProgram.build(
          Array.isArray(options) ? options : [options],
          !!option.watch,
        )
      }),
  )
  .addCommand(
    new Command('pkg')
      .description('使用 rollup 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
      .option('-w --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        await buildProgram.buildPkg(!!option.watch)
      }),
  )
  .addCommand(
    new Command('cli')
      .description('使用 rollup 将 ts cli 打包到 dist 目录，格式为 esm/cjs')
      .option('-w, --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        await buildProgram.buildCli(!!option.watch)
      }),
  )
