// 发布文档到 git-pages
const exec = require('child_process').execSync
console.log('Start Deploy github pages...')

const cmds = [
  'yarn docs',
  'yarn coverage',
  'cp CNAME docs/',
  'git subtree push --prefix=docs origin gh-pages',
  'rm -rf docs/'
]

cmds.forEach(cmd => {
  try {
    const stdout = exec(cmd)
    console.log(stdout.toString())
  } catch (err) {
    console.error(err)
    console.error('Deploy github pages failed')
    throw err
  }
})
