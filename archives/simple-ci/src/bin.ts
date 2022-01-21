import { Command } from 'commander'
import { pathExists, readJson, writeJson } from 'fs-extra'
import path from 'path'
import { JobProgram } from './commands/job/JobProgram'
import * as os from 'os'
import open from 'open'

const configPath = path.resolve(os.homedir(), '.simple-ci.json')

async function init() {
  if (!(await pathExists(configPath))) {
    await writeJson(configPath, [])
  }
}

new Command()
  .action(async () => {
    await init()
    const jobs = await readJson(configPath)
    await new JobProgram().exec(jobs)
  })
  .addCommand(
    new Command('open').action(async () => {
      await init()
      await open(configPath)
    }),
  )
  .parse()
