import { Command } from 'commander'
import { version } from '../package.json'

new Command()
  .argument('[name]')
  .option('--template <template>')
  .action(async (source: { name: string }, destination: { template: string }) => {
    console.log('args: ', source, destination)
  })
  .version(version)
  .parse()
