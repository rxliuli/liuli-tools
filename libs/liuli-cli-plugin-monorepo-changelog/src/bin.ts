import { Command } from 'commander'
import { prompt } from 'inquirer'

new Command('changelog')
  .action(async () => {
    const { name } = await prompt<{ name: string }>({
      type: 'input',
      name: 'name',
      message: '请输入名字',
    })
    console.log(`hello ${name}`)
  })
  .parse()
