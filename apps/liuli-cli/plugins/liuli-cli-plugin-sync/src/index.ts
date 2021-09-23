import { Command } from 'commander'
import { SyncProgram } from './SyncProgram'

const syncProgram = new SyncProgram(process.cwd())
export const command = new Command('sync')
  .description('同步配置')
  .action(async () => {
    await syncProgram.sync()
  })
  .addCommand(
    new Command('init').description('初始化同步配置').action(async () => {
      await syncProgram.init()
      await syncProgram.sync()
    }),
  )
export * from './SyncProgram'
