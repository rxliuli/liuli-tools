import { JobProgram } from '../JobProgram'
import path from 'path'

describe('测试 JobProgram', () => {
  const jobProgram = new JobProgram()
  it('基本示例', async () => {
    await jobProgram.exec([
      {
        name: 'echo',
        cwd: path.resolve(__dirname),
        steps: [
          {
            cmd: 'echo hello world',
            interval: 1000,
          },
        ],
      },
      {
        name: 'pwd',
        cwd: path.resolve(__dirname),
        steps: [
          {
            cmd: 'pwd',
          },
        ],
      },
    ])
  }, 10_000)
  it('真实场景', async () => {
    await jobProgram.exec([
      {
        name: 'wiki server',
        cwd: path.resolve('C:/Users/rxliuli/Code/company/wiki-backup'),
        steps: [
          {
            cmd: 'node cli/build.js',
            interval: 5 * 60 * 1000,
          },
          {
            cmd: 'live-server --port=5000 --no-browser .vitepress/dist',
          },
        ],
      },
    ])
  }, 100_000)
})
