import { Command } from 'commander'

const tester = new Command('test:unit')

tester.description('单元测试').action(async () => {
  console.log('运行所有单元测试')
})

export { tester }
