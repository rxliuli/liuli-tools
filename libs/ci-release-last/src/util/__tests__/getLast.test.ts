import { getLast } from '../getLast'
import path from 'path'

it('测试 getLastTag', async () => {
  const res = await getLast()
  console.log('res: ', res)
})
