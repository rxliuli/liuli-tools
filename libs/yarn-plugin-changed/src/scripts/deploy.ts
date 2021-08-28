import { publish, PublishOptions } from 'gh-pages'
import path from 'path'

async function publishPromise(basePath: string, config: PublishOptions) {
  await new Promise<void>((resolve, reject) => {
    publish(basePath, config, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

async function deploy() {
  console.log('开始部署')
  await publishPromise(path.resolve('bundles'), {
    repo: `https://${process.env.GITHUB_TOKEN}@github.com/rxliuli/liuli-tools.git`,
    dest: '/yarn-plugin-changed',
    add: true,
    user: {
      name: 'github actions bot',
      email: 'support+actions@github.com',
    },
  })
  console.log('结束部署')
}

deploy()
