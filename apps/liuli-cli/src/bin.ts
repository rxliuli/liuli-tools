import { Command } from 'commander'
import { buildCommand } from './commands/esbuild'
import { generateCommand } from './commands/generate'
import { syncCommand } from './commands/sync'

const main = new Command()
main
  .addCommand(buildCommand)
  .addCommand(generateCommand)
  .addCommand(syncCommand)
  .parse()
