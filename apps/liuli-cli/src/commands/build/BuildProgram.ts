import { OutputOptions, rollup, RollupOptions, watch } from 'rollup'
import { AsyncArray } from '@liuli-util/async'
import { readJson } from 'fs-extra'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import shebang from 'rollup-plugin-add-shebang'

export class BuildProgram {
  async build(options: RollupOptions[], isWatch: boolean) {
    if (isWatch) {
      watch(options)
      return
    }
    await AsyncArray.forEach(options, async (option) => {
      const bundle = await rollup(option)
      await AsyncArray.forEach(
        (Array.isArray(option.output)
          ? option.output
          : [option.output]) as OutputOptions[],
        async (output) => {
          await bundle.write(output)
        },
      )
      await bundle.close()
    })
  }

  async buildPkg(isWatch: boolean) {
    const outputOptions = [
      {
        file: './dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ]
    const external = await BuildProgram.scanExternal()
    const rollupOptions = outputOptions.map(
      (output) =>
        ({
          input: './src/index.ts',
          external: external,
          plugins: [typescript(), terser()],
          output,
        } as RollupOptions),
    )
    await this.build(rollupOptions, isWatch)
  }

  async buildCli(isWatch: boolean) {
    const external = await BuildProgram.scanExternal()
    await this.build(
      [
        {
          input: './src/bin.ts',
          external: external,
          plugins: [
            typescript(),
            terser(),
            shebang({
              include: ['./dist/bin.js'],
            }),
          ],
          output: {
            file: './dist/bin.js',
            format: 'cjs',
            sourcemap: true,
          },
        },
      ],
      isWatch,
    )
    await this.buildPkg(isWatch)
  }

  private static async scanExternal() {
    const json = await readJson('./package.json')
    return [
      ...Object.keys(json.dependencies || {}),
      ...Object.keys(json.devDependencies || {}),
    ]
  }
}
