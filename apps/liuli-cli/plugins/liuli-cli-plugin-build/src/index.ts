import { Command } from 'commander'
import { BuildProgram } from './BuildProgram'

const buildProgram = new BuildProgram()
export const command = new Command('build')
  .description('使用 rollup 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
  .action(async (option: { watch?: boolean; config?: true | string }) => {
    await buildProgram.buildPkg(!!option.watch)
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
      .option('-w, --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        await buildProgram.buildCli(!!option.watch)
      }),
  )
export * from './BuildProgram'
