import { FSWatcher, watch } from 'chokidar'
import path from 'path'
import { exhaustMapByParam } from '../util/exhaustMapByParam'

/**
 * 目录监视器
 */
export class Watcher {
  watchDirs(
    dirs: string[],
    callback: (dir: string) => Promise<void>,
  ): FSWatcher {
    const _callback = exhaustMapByParam(callback)
    return watch(
      dirs.map((dir) => path.join(dir, '*.json')),
      {
        depth: 1,
      },
    ).on('all', async (eventName, filePath) => {
      switch (eventName) {
        case 'add':
        case 'change':
        case 'unlink':
          await _callback(path.dirname(filePath))
      }
    })
  }
}
