import { watch } from 'chokidar'
import * as path from 'path'

it('测试 chokidar ignore', async () => {
  await new Promise((resolve, reject) =>
    watch('*.ts', {
      cwd: path.resolve(__dirname),
      followSymlinks: false,
      usePolling: false,
      interval: 100,
      binaryInterval: 300,
      ignoreInitial: true,
      ignored: ['*.test.ts'],
    })
      .on('all', (type, file) => {
        console.log('watch: ', type, file)
      })
      .on('error', reject),
  )
}, 100_000)
