# @liuli-util/test

辅助其他模块测试的工具函数库

## initTempPath

初始化一个临时目录，返回目录路径

```ts
import { it } from 'vitest'
import { initTempPath } from '@liuli-util/test'
import fs from 'fs'

const tempPath = initTempPath(__filename)

it('Test initTempPath', () => {
  expect(fs.existsSync(tempPath)).true
})
```
