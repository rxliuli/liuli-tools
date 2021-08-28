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
    repo: `https://${process.env.GH_TOKEN}@github.com/${process.env.GIT_NAME}/liuli-tools.git`,
    dest: '/yarn-plugin-changed',
    add: true,
    user: {
      name: process.env.GIT_NAME!,
      email: process.env.GIT_EMAIL!,
    },
  })
  console.log('结束部署')
}

deploy()
