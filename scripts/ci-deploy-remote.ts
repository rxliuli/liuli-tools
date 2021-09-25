import { publish } from 'gh-pages'
import * as path from 'path'
import { Octokit } from '@octokit/rest'

async function deployGHPages() {
  await new Promise<void>((resolve, reject) => {
    publish(
      path.resolve(__dirname),
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
  await octokit.rest.reactions.createForRelease({
    owner: 'rxliuli',
    repo: 'liuli-tools',
    release_id: Date.now(),
    content: '+1',
  })
}

async function main() {
  await publishRelease()
}

main()
