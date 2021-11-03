import path from 'path'
import { Plugin } from 'rollup'
import { generate, scan, write } from '@liuli-util/env2dts'
import { watch } from 'chokidar'

/**
 * 生成 env dts 的插件
 * @param options
 */
export function envDtsGen(options: { input?: string; output: string }): Plugin {
  let watchFlag = false
  async function exec() {
    const envs = await scan(options.input ?? path.resolve())
    const code = generate(envs)
    await write(options.output, code)
  }
  return {
    name: 'rollup-plugin-env-dts-gen',
    async buildStart() {
      if (watchFlag) {
        return
      }
      watchFlag = true

      await exec()
      if (this.meta.watchMode) {
        watch('.env*', {
          depth: 1,
          cwd: path.resolve(),
        }).on('change', exec)
      }
    },
  }
}
