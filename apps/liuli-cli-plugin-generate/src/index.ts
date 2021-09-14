import { Command, Option } from 'commander'
import {
  GenerateConfig,
  GenerateProgram,
  TemplateTypeEnum,
} from './GenerateProgram'

const initProgram = new GenerateProgram()

const templateOption = new Option('--template [template]', '模板类型').choices([
  TemplateTypeEnum.Lib,
  TemplateTypeEnum.Cli,
])
templateOption.required = true

export const command = new Command()
  .command('generate [dest]')
  .description('生成一些初始项目')
  .addOption(templateOption)
  .action(async (dest, options: Pick<GenerateConfig, 'template'>) => {
    await initProgram.generate({
      ...options,
      dest: dest,
      initSync: true,
    })
  })
