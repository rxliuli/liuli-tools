import { Command } from 'commander'
import { ESBuildProgram, TaskTypeEnum } from './ESBuildProgram'
import path from 'path'

type CliBuildOptions = { watch?: boolean }
const program = new ESBuildProgram({
  base: path.resolve(),
  isWatch: false,
})
export const esbuildCommand = new Command('build')
  .addCommand(
    new Command('lib')
      .description('使用 esbulid 将 ts lib 打包到 dist 目录，格式为 esm/cjs')
      .option('-w --watch', '监视模式')
      .action(async (options: CliBuildOptions) => {
        program.isWatch = !!options.watch
        const tasks = await program.getTasks()
        await program.execTasks([tasks.esm, tasks.cjs, tasks.dts])
      })
      .alias('pkg'),
  )
  .addCommand(
    new Command('cli')
      .description('使用 esbulid 将 ts cli 打包到 dist 目录，格式为 cjs，并且捆绑依赖')
      .option('-w, --watch', '监视模式')
      .action(async (options: CliBuildOptions) => {
        program.isWatch = !!options.watch
        const tasks = await program.getTasks()
        await program.execTasks([tasks.cli, tasks.esm, tasks.cjs, tasks.dts])
      }),
  )
  .addCommand(
    (['iife', 'cli', 'esm', 'cjs', 'dts'] as TaskTypeEnum[]).reduce(
      (res, type) => {
        res.addCommand(
          new Command(type)
            .description(`单独构建 ${type}`)
            .option('-w --watch', '监视模式')
            .action(async (options: CliBuildOptions) => {
              program.isWatch = !!options.watch
              const tasks = await program.getTasks()
              await program.execTasks([tasks[type]])
            }),
        )
        return res
      },
      new Command('single')
        .description('单独构建某种类型的 bundle')
        .option('-t, --target <target...>', '构建目标，是一个数组，可以使用 , 分割')
        .option('-w, --watch', '监视模式')
        .action(async (options: { target: TaskTypeEnum[]; watch?: boolean }) => {
          program.isWatch = !!options.watch
          const tasks = await program.getTasks()
          await program.execTasks(
            options.target.flatMap((s) => s.split(',') as TaskTypeEnum[]).map((type) => tasks[type]),
          )
        }),
    ),
  )
