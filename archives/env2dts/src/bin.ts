import { Command } from 'commander'
import { scan } from './util/scan'
import * as path from 'path'
import { generate } from './util/generate'
import { write } from './util/write'

interface Option {
  input?: string
  output: string
  watch?: boolean
}

new Command()
  .option('-i,--input <dir>', '扫描的目录，默认是当前目录')
  .requiredOption('-o,--output <output>', '写入的文件位置')
  // .option('-w,--watch', '是否启动监视模式')
  .action(async (options: Option) => {
    const envs = await scan(options.input ?? path.resolve())
    const code = generate(envs)
    await write(options.output, code)
  })
  .parse()
