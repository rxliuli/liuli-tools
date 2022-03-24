import { Plugin } from 'esbuild'
import { readFile, readJson, writeJson } from 'fs-extra'
import * as path from 'path'

/**
 * 处理 nodejs 原生模块
 * @link https://github.com/evanw/esbuild/issues/1051#issuecomment-806325487
 */
export function nativeNodeModules(): Plugin {
  return {
    name: 'native-node-modules',
    setup(build) {
      // If a ".node" file is imported within a module in the "file" namespace, resolve
      // it to an absolute path and put it into the "node-file" virtual namespace.
      build.onResolve({ filter: /\.node$/, namespace: 'file' }, (args) => ({
        path: require.resolve(args.path, { paths: [args.resolveDir] }),
        namespace: 'node-file',
      }))

      // Files in the "node-file" virtual namespace call "require()" on the
      // path from esbuild of the ".node" file in the output directory.
      build.onLoad({ filter: /.*/, namespace: 'node-file' }, (args) => ({
        contents: `
        import path from ${JSON.stringify(args.path)}
        try { module.exports = require(path) }
        catch {}
      `,
      }))

      // If a ".node" file is imported within a module in the "node-file" namespace, put
      // it in the "file" namespace where esbuild's default loading behavior will handle
      // it. It is already an absolute path since we resolved it to one above.
      build.onResolve({ filter: /\.node$/, namespace: 'node-file' }, (args) => ({
        path: args.path,
        namespace: 'file',
      }))

      // Tell esbuild's default loading behavior to use the "file" loader for
      // these ".node" files.
      const opts = build.initialOptions
      opts.loader = opts.loader || {}
      opts.loader['.node'] = 'file'
    },
  }
}

/**
 * 排除和替换 node 内置模块
 */
export function nodeExternals(): Plugin {
  return {
    name: 'esbuild-plugin-node-externals',
    setup(build) {
      build.onResolve({ filter: /(^node:)/ }, (args) => ({
        path: args.path.slice(5),
        external: true,
      }))
    },
  }
}

/**
 * 自动排除所有依赖项
 * golang 不支持 js 的一些语法，参考 https://github.com/evanw/esbuild/issues/1634
 */
export function autoExternal(): Plugin {
  return {
    name: 'esbuild-plugin-auto-external',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (/^\.{1,2}\//.test(args.path)) {
          return
        }
        return {
          path: args.path,
          external: true,
        }
      })
    },
  }
}

/**
 * 通过 ?raw 将资源作为字符串打包进来
 * @returns
 */
export function raw(): Plugin {
  return {
    name: 'esbuild-plugin-raw',
    setup(build) {
      build.onResolve({ filter: /\?raw$/ }, (args) => {
        return {
          path: path.isAbsolute(args.path) ? args.path : path.join(args.resolveDir, args.path),
          namespace: 'raw-loader',
        }
      })
      build.onLoad({ filter: /\?raw$/, namespace: 'raw-loader' }, async (args) => {
        return {
          contents: await readFile(args.path.replace(/\?raw$/, '')),
          loader: 'text',
        }
      })
    },
  }
}

/**
 * @param {string} str
 */
function isValidId(str: string) {
  try {
    new Function(`var ${str};`)
  } catch (err) {
    return false
  }
  return true
}

function defineImportEnv() {
  const definitions: Record<string, string> = {}
  Object.keys(process.env).forEach((key) => {
    if (isValidId(key)) {
      definitions[`import.meta.env.${key}`] = JSON.stringify(process.env[key])
    }
  })
  definitions['import.meta.env'] = '{}'
  return definitions
}

/**
 * Pass environment variables to esbuild.
 * @return An esbuild plugin.
 */
export function envPlugin(): Plugin {
  return {
    name: 'esbuild-plugin-env',
    setup(build) {
      const { platform, define = {} } = build.initialOptions
      if (platform === 'node') {
        return
      }
      build.initialOptions.define = define
      Object.assign(build.initialOptions.define, defineImportEnv())
    },
  }
}

/**
 * 生成 metafile 的插件
 * @param metafilePath
 */
export function metafile(metafilePath: string): Plugin {
  return {
    name: 'esbuild-plugin-metafile',
    setup(builder) {
      builder.onEnd(async (result) => {
        await writeJson(metafilePath, result.metafile)
      })
    },
  }
}

function generateBanner(meta: object) {
  return (
    [
      '// ==UserScript==',
      ...Object.entries(meta)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((item) => `// @${key} ${item}`)
          }
          return `// @${key} ${value}`
        })
        .flat(),
      '// ==/UserScript==',
    ].join('\n') + '\n'
  )
}

export function userJS(): Plugin {
  return {
    name: 'esbuild-plugin-userjs',
    async setup(build) {
      const json = (await readJson(path.resolve(build.initialOptions.absWorkingDir!, 'package.json'))) as {
        userjs: object
      }
      if (!json.userjs) {
        throw new Error('userjs is not supported')
      }
      if (!build.initialOptions.banner) {
        build.initialOptions.banner = {}
      }
      build.initialOptions.banner!['js'] = generateBanner(json.userjs)
    },
  }
}
