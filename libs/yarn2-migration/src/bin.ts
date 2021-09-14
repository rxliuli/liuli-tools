import { Command } from 'commander'
import { MigrationYarn2Plus } from './MigrationYarn2Plus'
import * as path from 'path'
import ora from 'ora'
import { getLanguage, i18nextUtil } from './constants/i18nextUtil'
import enUS from './i18n/en-US.json'
import zhCN from './i18n/zh-CN.json'
import { LanguageEnum } from '@liuli-util/i18next-util'

new Command()
  .action(async () => {
    const migrationYarn2Plus = new MigrationYarn2Plus({
      basePath: path.resolve(),
    })
    await i18nextUtil.init(
      { [LanguageEnum.En]: enUS, [LanguageEnum.ZhCN]: zhCN },
      await getLanguage(),
    )
    const spinner = ora({
      color: 'blue',
    })
    spinner.start(i18nextUtil.t('setVersion'))
    await migrationYarn2Plus.setVersion()
    spinner.stopAndPersist()
    spinner.start(i18nextUtil.t('updateYaml'))
    await migrationYarn2Plus.updateYaml()
    spinner.stopAndPersist()
    spinner.start(i18nextUtil.t('updateGitIgnore'))
    await migrationYarn2Plus.updateGitIgnore()
    spinner.stopAndPersist()
    spinner.start(i18nextUtil.t('install'))
    await migrationYarn2Plus.install()
    spinner.stopAndPersist()
    spinner.start(i18nextUtil.t('end'))
    spinner.stopAndPersist()
  })
  .parse()
