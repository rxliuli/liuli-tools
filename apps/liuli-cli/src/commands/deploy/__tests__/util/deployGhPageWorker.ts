import { GhPagesDeployService } from '../../DeployService'
import * as path from 'path'

async function deployGhPages() {
  const tempPath = path.resolve(__dirname, '../.temp/')
  const ghPagesDeployService = new GhPagesDeployService({
    cwd: tempPath,
    dist: 'dist',
    dest: 'examples/test-app',
    debug: false,
  })
  const now = Date.now()
  await ghPagesDeployService.deploy().on('process', (title) => console.log(`[${now}] ${title}`))
}

// noinspection JSIgnoredPromiseFromCall
deployGhPages()
