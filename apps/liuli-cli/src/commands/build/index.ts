import { Command } from 'commander'
import { BuildProgram } from './BuildProgram'

const buildProgram = new BuildProgram()
export const buildCommand = new Command('build')
  .description('使用 rollup 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
  .action(async (option: { watch?: boolean; config?: true | string }) => {
    await buildProgram.buildPkg(!!option.watch)
  })
  // .addCommand(
  //   new Command('config')
  //     .description('根据 rollup.config.ts 配置打包')
  //     .option('-w --watch', '监视模式')
  //     .option('-c --config [config]', '使用自定义配置文件')
  //     .action(async (option: { watch?: boolean; config?: true | string }) => {
  //       const configFile = new TypeScriptConfigFile({
  //         configFile: typeof option.config === 'string' ? option.config : 'rollup.config.ts',
  //         configRoot: path.resolve('.'),
  //       })
  //       const options = await configFile.load()
  //       await buildProgram.build(
  //         Array.isArray(options) ? options : [options],
  //         !!option.watch,
  //       )
  //     }),
  // )
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
