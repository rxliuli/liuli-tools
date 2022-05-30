import { Plugin } from 'esbuild'

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

/**
 * Create a map of replacements for environment variables.
 * @return A map of variables.
 */
export function defineProcessEnv() {
  /**
   * @type {{ [key: string]: string }}
   */
  const definitions: Record<string, string> = {}
  definitions['process.env.NODE_ENV'] = JSON.stringify(process.env.NODE_ENV || 'development')
  Object.keys(process.env).forEach((key) => {
    if (isValidId(key)) {
      definitions[`process.env.${key}`] = JSON.stringify(process.env[key])
    }
  })
  definitions['process.env'] = '{}'

  return definitions
}

export function defineImportEnv() {
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
export function env(options: { process?: boolean; import?: boolean }): Plugin {
  return {
    name: 'env',
    setup(build) {
      const { platform, define = {} } = build.initialOptions
      if (platform === 'node') {
        return
      }
      build.initialOptions.define = define
      if (options.import) {
        Object.assign(build.initialOptions.define, defineImportEnv())
      }
      if (options.process) {
        Object.assign(build.initialOptions.define, defineProcessEnv())
      }
    },
  }
}
