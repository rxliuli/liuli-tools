import { Command } from 'commander'
import { ESBuildProgram } from './ESBuildProgram'
import path from 'path'

const buildProgram = new ESBuildProgram(path.resolve())
export const buildCommand = new Command('build')
  .addCommand(
    new Command('pkg')
      .description('使用 esbulid 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
      .option('-w --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        await buildProgram.buildPkg(!!option.watch)
      }),
  )
  .addCommand(
    new Command('cli')
      .description(
        '使用 esbulid 将 ts cli 打包到 dist 目录，格式为 cjs，并且捆绑依赖',
      )
      .option('-w, --watch', '监视模式')
      .action(async (option: { watch?: boolean }) => {
        await buildProgram.buildCli(!!option.watch)
      }),
  )
