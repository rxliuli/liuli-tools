import { Command } from 'commander'
import { BuildProgram } from './BuildProgram'
import { TypeScriptConfigFile } from '../../utils'
import path from 'path'

const buildProgram = new BuildProgram()
export const buildCommand = new Command('build')
  .description('使用 rollup 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
  .option('-w --watch', '监视模式')
  .option('-c --config [config]', '使用自定义配置文件')
  .action(async (option: { watch?: boolean; config?: true | string }) => {
    if (!!option.config) {
      const configFile = new TypeScriptConfigFile({
        configFile: option.config === true ? 'rollup.config.ts' : option.config,
        configRoot: path.resolve('.'),
      })
      const options = await configFile.load()
      await buildProgram.build(
        Array.isArray(options) ? options : [options],
        !!option.watch,
      )
    } else {
      await buildProgram.buildPkg(!!option.watch)
    }
  })
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
      .option('-w --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        await buildProgram.buildCli(!!option.watch)
      }),
  )
