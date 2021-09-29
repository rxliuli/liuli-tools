import { Command } from 'commander'
import { ESBuildProgram } from './ESBuildProgram'
import path from 'path'

export const esbuildCommand = new Command('build')
  .addCommand(
    new Command('lib')
      .description('使用 esbulid 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
      .option('-w --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        const buildProgram = new ESBuildProgram({
          base: path.resolve(),
          isWatch: !!option.watch,
        })
        await buildProgram.buildLib()
      })
      .alias('pkg'),
  )
  .addCommand(
    new Command('cli')
      .description(
        '使用 esbulid 将 ts cli 打包到 dist 目录，格式为 cjs，并且捆绑依赖',
      )
      .option('-w, --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        const buildProgram = new ESBuildProgram({
          base: path.resolve(),
          isWatch: !!option.watch,
        })
        await buildProgram.buildCli()
      }),
  )
