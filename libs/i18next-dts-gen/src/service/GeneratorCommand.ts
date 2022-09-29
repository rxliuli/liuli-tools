import { Scanner } from './Scanner'
import { Parser } from './Parser'
import { Generator } from './Generator'
import { writeFile } from '@liuli-util/fs-extra'
import path from 'path'
import { AsyncArray } from '@liuli-util/async'
import { Watcher } from './Watcher'
import { getLanguage, i18n } from '../constants/I18n'
import en from '../i18n/en.json'
import zhCN from '../i18n/zhCN.json'
import { normalizePath } from '../utils/normalizePath'

export interface GenerateOptions {
  dirs: string[]
  watch: boolean
  language: string
}

export class GeneratorCommandProgram {
  /**
   * 生成类型定义的主程序
   * @param options
   */
  async main(options: GenerateOptions): Promise<void> {
    await i18n.init(
      {
        en,
        zhCN,
      },
      await getLanguage(),
    )

    if (options.watch) {
      new Promise((resolve, reject) => {
        new Watcher().watchDirs(options.dirs, (dir) => this.exec(dir, options.language)).on('error', reject)
      })
    }

    await AsyncArray.forEach(options.dirs, (dir) => this.exec(dir, options.language))
  }

  // noinspection JSMethodCanBeStatic
  private async exec(dirPath: string, language: string) {
    const start = Date.now()
    const dtsPath = path.join(dirPath, 'index.d.ts')
    const scanner = new Scanner()
    const parser = new Parser(language)
    const generator = new Generator()
    const locales = await scanner.scan(dirPath)
    const configs = parser.parse(locales)
    const code = generator.generate(configs)
    await writeFile(dtsPath, code)

    console.info(
      i18n.t('generator.end', {
        time: Date.now() - start,
        dtsPath: normalizePath(path.relative(path.resolve(), dtsPath)),
      }),
    )
  }
}
