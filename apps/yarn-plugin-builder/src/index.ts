import { build, Plugin } from 'esbuild'
import * as path from 'path'
import { mkdirp } from 'fs-extra'
import { getDynamicLibs } from '@yarnpkg/cli'

interface YarnPluginBuildOptions {
  base: string
  name: string
  org: string
}

export const isDynamicLib = (request: string) => {
  if (getDynamicLibs().has(request)) return true
  return !!request.match(/^@yarnpkg\/plugin-/)
}

/**
 * @link https://github.com/yarnpkg/berry/blob/84f14432b18fa269c8db89b40473797202498e06/packages/yarnpkg-builder/sources/commands/build/plugin.ts#L94
 */
export async function buildYarnPlugin(
  options: YarnPluginBuildOptions,
): Promise<void> {
  const dynamicLibResolver: Plugin = {
    name: `dynamic-lib-resolver`,
    setup(build) {
      const matchAll = /()/
      const pathRegExp =
        /^(?![a-zA-Z]:[\\/]|\\\\|\.{0,2}(?:\/|$))((?:@[^/]+\/)?[^/]+)\/*(.*|)$/
      build.onResolve({ filter: matchAll }, async (args) => {
        if (args.path.startsWith('node:')) {
          return {
            path: args.path.slice(5),
            external: true,
          }
        }
        const dependencyNameMatch = args.path.match(pathRegExp)
        if (dependencyNameMatch === null) {
          return
        }

        const [, dependencyName] = dependencyNameMatch
        if (dependencyName === options.name || !isDynamicLib(args.path)) {
          return
        }

        return {
          path: args.path,
          external: true,
        }
      })
    },
  }

  await mkdirp(path.resolve(options.base, `bundles/${options.org}/`))
  await build({
    banner: {
      js: [
        `/* eslint-disable */`,
        `//prettier-ignore`,
        `module.exports = {`,
        `name: ${JSON.stringify(options.org + '/' + options.name)},`,
        `factory: function (require) {`,
      ].join(`\n`),
    },
    globalName: `plugin`,
    footer: {
      js: [`return plugin;`, `}`, `};`].join(`\n`),
    },
    entryPoints: [path.resolve(options.base, `src/index`)],
    bundle: true,
    outfile: path.resolve(
      options.base,
      `bundles/${options.org}/${options.name}.js`,
    ),
    logLevel: `silent`,
    format: `iife`,
    platform: `node`,
    plugins: [dynamicLibResolver],
    // minify: true,
    // sourcemap: 'inline',
  })
}
