import { Command } from 'commander'
import { GeneratorCommandProgram } from './service/GeneratorCommand'
import en from './i18n/en.json'
import zhCN from './i18n/zhCN.json'
import { getLanguage, i18n } from './constants/I18n'
;(async () => {
  await i18n.init({ en, zhCN }, await getLanguage())
  await new Command()
    .option('-i, --dirs <dirs...>', i18n.t('cli.option.dirs'))
    .option('-w, --watch', i18n.t('cli.option.watch'))
    .option('-l, --language', i18n.t('cli.option.language'), 'en')
    .description(i18n.t('cli.description'))
    .action(async (options) => {
      await new GeneratorCommandProgram().main(options)
    })
    .parseAsync()
})()
