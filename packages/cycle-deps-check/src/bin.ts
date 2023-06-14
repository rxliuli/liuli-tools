import { Command } from 'commander'
import { scanCycleDeps } from './scanCycleDeps'

new Command()
  .action(async () => {
    console.log('cycle deps: ', await scanCycleDeps(process.cwd()))
  })
  .parse()
