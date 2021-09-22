import { Command } from 'commander'
import { command as buildCommand } from '@liuli-util/liuli-cli-plugin-esbuild'
import { command as initCommand } from '@liuli-util/liuli-cli-plugin-generate'
import { command as syncCommand } from '@liuli-util/liuli-cli-plugin-sync'

const main = new Command()
main
  .addCommand(buildCommand)
  .addCommand(initCommand)
  .addCommand(syncCommand)
  .parse()
