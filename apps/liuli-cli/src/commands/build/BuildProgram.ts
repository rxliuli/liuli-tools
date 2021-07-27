import { OutputOptions, Plugin, rollup, RollupOptions, watch } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import shebang from 'rollup-plugin-add-shebang'
import json from '@rollup/plugin-json'
import externals from 'rollup-plugin-node-externals'
import autoExternal from 'rollup-plugin-auto-external'

export class BuildProgram {
  async build(options: RollupOptions[], isWatch: boolean) {
    if (isWatch) {
      watch(
        options.map((option) => {
          return {
            ...option,
            plugins: option.plugins?.filter(
              (plugin) => (plugin as Plugin)?.name !== 'terser',
            ),
          }
        }),
      )
      return
    }
    await Promise.all(
      options.map(async (option) => {
        const bundle = await rollup(option)
        await Promise.all(
          (
            (Array.isArray(option.output)
              ? option.output
              : [option.output]) as OutputOptions[]
          ).map(async (output) => {
            await bundle.write(output)
          }),
        )
        await bundle.close()
      }),
    )
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
    const rollupOptions = outputOptions.map(
      (output) =>
        ({
          input: './src/index.ts',
          plugins: [
            typescript(),
            autoExternal(),
            externals(),
            json(),
            terser(),
          ],
          output,
        } as RollupOptions),
    )
    await this.build(rollupOptions, isWatch)
  }

  async buildCli(isWatch: boolean) {
    await this.build(
      [
        {
          input: './src/bin.ts',
          plugins: [
            typescript({
              tsconfigOverride: {
                compilerOptions: {
                  declaration: false,
                  declarationMap: false,
                },
              },
            }),
            autoExternal(),
            externals(),
            json(),
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
}
