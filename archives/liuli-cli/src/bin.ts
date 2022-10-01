import { Command } from 'commander'
import { esbuildCommand } from './commands/esbuild'
import { generateCommand } from './commands/generate'
import { syncCommand } from './commands/sync'
import { deployCommand } from './commands/deploy'
new Command()
  .addCommand(esbuildCommand)
  .addCommand(generateCommand)
  .addCommand(syncCommand)
  .addCommand(deployCommand)
  .parse()
