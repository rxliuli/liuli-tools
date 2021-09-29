import { Command } from 'commander'
import { esbuildCommand } from './commands/esbuild'
import { generateCommand } from './commands/generate'
import { syncCommand } from './commands/sync'

const main = new Command()
main
  .addCommand(esbuildCommand)
  .addCommand(generateCommand)
  .addCommand(syncCommand)
  .parse()
