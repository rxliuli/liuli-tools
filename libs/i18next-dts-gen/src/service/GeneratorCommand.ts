import { Scanner } from './Scanner'
import { Parser } from './Parser'
import { Generator } from './Generator'
import { writeFile } from 'fs-extra'
import path from 'path'
import { AsyncArray } from '@liuli-util/async'
import { Watcher } from './Watcher'
import ora from 'ora'
import { DateTime } from 'luxon'
import { i18n } from '../constants/I18n'

export class GeneratorCommandProgram {
  /**
   * 生成类型定义的主程序
   * @param options
   */
  async main(options: {
    dirs: string[]
    watch: boolean
    language: string
  }): Promise<void> {
    if (options.watch) {
      new Promise((resolve, reject) => {
        new Watcher()
          .watchDirs(options.dirs, (dir) => this.exec(dir, options.language))
          .on('error', reject)
      })
    }
    await AsyncArray.forEach(options.dirs, (dir) =>
      this.exec(dir, options.language),
    )
  }

  // noinspection JSMethodCanBeStatic
  private async exec(dirPath: string, language: string) {
    const formatter = 'yyyy-MM-dd hh:mm:ss'
    const spinner = ora({ color: 'blue' })
    const dtsPath = path.join(dirPath, 'index.d.ts')
    spinner.start(
      i18n.t('generator.begin', {
        time: DateTime.now().toFormat(formatter),
        dtsPath,
      }),
    )
    const scanner = new Scanner()
    const parser = new Parser(language)
    const generator = new Generator()
    const locales = await scanner.scan(dirPath)
    const configs = parser.parse(locales)
    const code = generator.generate(configs)
    await writeFile(dtsPath, code)
    spinner.stopAndPersist({
      text: i18n.t('generator.end', {
        time: DateTime.now().toFormat(formatter),
        dtsPath,
      }),
    })
  }
}
