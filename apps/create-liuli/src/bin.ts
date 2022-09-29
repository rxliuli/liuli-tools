import { Command } from 'commander'
import path from 'path'
import { generate, GenerateOptions } from './generate.js'

new Command()
  .requiredOption('--name <name>', 'project name')
  .requiredOption('--type <type>', 'template')
  .option('--overwrite', 'overwrite')
  .action((options: Omit<GenerateOptions, 'cwd'>) =>
    generate({
      ...options,
      cwd: path.resolve(),
    }),
  )
  .parse()
