import { Command } from 'commander'
import { GeneratorCommandProgram } from './service/GeneratorCommand'
import en from './i18n/en.json'
import zhCN from './i18n/zhCN.json'
import { getLanguage, i18n } from './constants/I18n'
;(async () => {
  await i18n.init({ en, zhCN }, await getLanguage())
  await new Command()
    .option('-i, --input <input...>', i18n.t('cli.option.input'))
    .option('-w, --watch', i18n.t('cli.option.watch'))
    .description(i18n.t('cli.description'))
    .action(async (options: { input: string[]; watch: boolean }) => {
      await new GeneratorCommandProgram().main({
        dirs: options.input,
        watch: options.watch,
      })
    })
    .parseAsync()
})()
