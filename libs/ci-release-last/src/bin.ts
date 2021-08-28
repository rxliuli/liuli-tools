import { Command } from 'commander'
import { getLast } from './util/getLast'
import { execSync } from 'child_process'

new Command()
  .action(async () => {
    const last = await getLast()
    if (!last) {
      console.log('没有找到最后提交')
      return
    }
    process.env.RELEASE_LAST_MODULE = last.module
    process.env.RELEASE_LAST_VERSION = last.version
    const command = `yarn workspaces foreach --include ${last.module} run pub`
    console.log('cmd: ', command)
    execSync(command, {
      stdio: 'inherit',
      env: process.env,
    })
  })
  .parse()
