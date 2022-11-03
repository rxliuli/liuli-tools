import { Command } from 'commander'
import path from 'path'
import { generate, GenerateOptions, initOptions } from './generate.js'

new Command()
  .arguments('[name]')
  .option('--type <type>', 'template')
  .option('--overwrite', 'is overwrite')
  .action(async (name, destination: Omit<GenerateOptions, 'cwd' | 'name'>) => {
    const options = await initOptions({ ...destination, name, cwd: path.resolve() })
    await generate(options)
  })
  .parse()
