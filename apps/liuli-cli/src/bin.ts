import { Command } from 'commander'
import { buildCommand } from './commands/build'
import { initCommand } from './commands/init'
import { syncCommand } from './commands/sync'

const main = new Command('pinefield')
main
  .addCommand(buildCommand)
  .addCommand(initCommand)
  .addCommand(syncCommand)
  .parse()
