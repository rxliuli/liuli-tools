import { fileURLToPath } from 'url'
import { publish } from 'gh-pages'
import * as path from 'path'
import { Octokit } from '@octokit/rest'

async function deployGHPages() {
  await new Promise<void>((resolve, reject) => {
    publish(
      path.resolve(path.dirname(fileURLToPath(import.meta.url))),
      {
        user: {
          name: 'rxliuli',
          email: 'rxliuli@gmail.com',
        },
        dest: '/test/',
        add: true,
        dotfiles: true,
      },
      (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      },
    )
  })
}

async function publishRelease() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })
  await octokit.rest.repos.createRelease({
    owner: 'rxliuli',
    repo: 'liuli-tools',
    tag_name: '@liuli-util/test@0.1.0',
  })
}

async function main() {
  await publishRelease()
}

main()
