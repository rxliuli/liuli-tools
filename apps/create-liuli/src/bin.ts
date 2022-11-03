import { Command } from 'commander'
import path from 'path'
import { generate, GenerateOptions, initOptions } from './generate'
import { version } from '../package.json'

new Command()
  .arguments('[name]')
  .option('--template <template>', 'template')
  .option('--overwrite', 'is overwrite')
  .action(async (name, destination: Omit<GenerateOptions, 'cwd' | 'name'>) => {
    const options = await initOptions({ ...destination, name, cwd: path.resolve() })
    await generate(options)
  })
  .version(version)
  .parse()
