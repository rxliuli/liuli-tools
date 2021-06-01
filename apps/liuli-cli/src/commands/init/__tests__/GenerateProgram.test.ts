import { GenerateProgram, TemplateTypeEnum } from '../GenerateProgram'
import path from 'path'

describe('测试 InitProgram', () => {
  const initProgram = new GenerateProgram()
  it('生成项目', async () => {
    await initProgram.generate({
      template: TemplateTypeEnum.Lib,
      dest: path.resolve(__dirname, 'temp/lib-demo'),
    })
  })
})
