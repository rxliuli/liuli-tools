const { readdirSync } = require('fs-extra')

module.exports = {
  title: 'liuli-util',
  hidePrivateMembers: true,
  externalLinks: {
    GitHub: 'https://github.com/rxliuli/rx-util',
  },
  modules: readdirSync('./libs').map((name) => ({
    package: `./libs/${name}/package.json`,
    tsconfig: `./libs/${name}/tsconfig.json`,
    mainFile: 'index.ts',
  })),
}
