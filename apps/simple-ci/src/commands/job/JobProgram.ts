import { AsyncArray } from '@liuli-util/async'
import { exec, ExecOptions } from 'child_process'
import * as console from 'console'

interface StepConfig {
  cmd: string
  interval?: number
}

interface JobConfig {
  name: string
  cwd: string
  disable?: boolean
  steps: StepConfig[]
}

function execPromise(
  command: string,
  options?: ExecOptions,
): Promise<string | Buffer> {
  return new Promise<string | Buffer>((resolve, reject) => {
    exec(command, options, (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}

export class JobProgram {
  async exec(jobConfigs: JobConfig[]): Promise<void> {
    await AsyncArray.map(
      jobConfigs.filter((job) => !job.disable),
      async (job) => {
        console.log('执行 job: ', job.name)
        await AsyncArray.map(job.steps, async (step) => {
          const run = async () => {
            console.log(`[${job.name}] 开始执行 step: `, step.cmd)
            await execPromise(step.cmd, {
              cwd: job.cwd,
            })
            console.log(`[${job.name}] 结束执行 step: `, step.cmd)
          }
          await run()
          if (step.interval) {
            await new Promise(() => {
              setInterval(run, step.interval!)
            })
          }
        })
      },
    )
  }
}
