import { FilterCommand } from './FilterCommand'
import { Command } from 'clipanion'

export class ChangedListCommand extends FilterCommand {
  public static usage = Command.Usage({
    description: '基于 git 计算变更的模块，然后列出变更的模块',
    examples: [
      [
        '列出 initialize 命令自上次运行后变更的模块',
        'yarn changed list run initialize',
      ],
    ],
  })

  static paths = [['changed', 'list']]

  async execute() {
    await this.main()
  }
}
