# @liuli-util/test

Utility function library for assisting in testing other modules.

## initTempPath

Initialize a temporary directory and return its path.

```ts
import { it } from 'vitest'
import { initTempPath } from '@liuli-util/test'
import fs from 'fs'

const tempPath = initTempPath(__filename)

it('Test initTempPath', () => {
  expect(fs.existsSync(tempPath)).true
})
```
