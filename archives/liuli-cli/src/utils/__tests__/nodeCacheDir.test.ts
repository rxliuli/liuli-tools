import { expect, it } from 'vitest'
import { nodeCacheDir } from '../nodeCacheDir'

it('测试 nodeCacheDir', () => {
  const res = nodeCacheDir('liuli-cli')
  console.log(res)
})
