import { Command, Option } from 'commander'
import { GenerateConfig, GenerateProgram, TemplateTypeEnum } from './GenerateProgram'

const generateProgram = new GenerateProgram()

const templateOption = new Option('--template [template]', '模板类型').choices([
  TemplateTypeEnum.Lib,
  TemplateTypeEnum.Cli,
])
templateOption.required = true

export const generateCommand = new Command()
  .command('generate [dest]')
  .description('生成一些初始项目')
  .addOption(templateOption)
  .option('--init-sync', '是否同步初始化', true)
  .action(async (dest, options: Pick<GenerateConfig, 'template' | 'initSync'>) => {
    await generateProgram.generate({
      ...options,
      dest: dest,
      initSync: options.initSync,
    })
  })
