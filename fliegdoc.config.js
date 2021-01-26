const { readdirSync } = require('fs-extra')

const excludeLib = ['cli']

module.exports = {
  title: 'liuli-util',
  hidePrivateMembers: true,
  externalLinks: {
    GitHub: 'https://github.com/rxliuli/rx-util',
  },
  modules: readdirSync('./libs')
    .filter((name) => !excludeLib.includes(name))
    .map((name) => ({
      package: `./libs/${name}/package.json`,
      tsconfig: `./libs/${name}/tsconfig.json`,
      mainFile: 'index.ts',
    })),
}
