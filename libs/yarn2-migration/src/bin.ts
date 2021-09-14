import { Command } from 'commander'
import { MigrationYarn2Plus } from './MigrationYarn2Plus'
import * as path from 'path'
import ora from 'ora'

new Command()
  .action(async () => {
    const migrationYarn2Plus = new MigrationYarn2Plus({
      basePath: path.resolve(),
    })
    const spinner = ora({
      color: 'blue',
    })
    spinner.start('设置版本')
    await migrationYarn2Plus.setVersion()
    spinner.stopAndPersist()
    spinner.start('更新 yaml 配置')
    await migrationYarn2Plus.updateYaml()
    spinner.stopAndPersist()
    spinner.start('更新 gitignore')
    await migrationYarn2Plus.updateGitIgnore()
    spinner.stopAndPersist()
    spinner.start('安装依赖')
    await migrationYarn2Plus.install()
    spinner.stopAndPersist()
    spinner.start('升级依赖完成')
    spinner.stopAndPersist()
  })
  .parse()
