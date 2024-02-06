import { IConfigFile, ExtractorConfig, ExtractorResult, Extractor } from '@microsoft/api-extractor'
import { writeFile, rm } from 'fs/promises'
import { Plugin, ResolvedConfig } from 'vite'
import pathe from 'pathe'

async function dtsBundle(options: { entry: string; outFile: string }) {
  const configPath = pathe.resolve(options.entry + '.json')
  await writeFile(
    configPath,
    JSON.stringify({
      $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
      mainEntryPointFilePath: options.entry,
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: options.outFile,
      },
      tsdocMetadata: { enabled: false },
      apiReport: { enabled: false },
      docModel: { enabled: false },
    } as IConfigFile),
  )
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(configPath)
  const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: false,
    showDiagnostics: false,
  })
  if (!extractorResult.succeeded) {
    throw new Error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`,
    )
  }
}

export async function dts(options: { bundle?: boolean; entry: string[]; outDir?: string }): Promise<Plugin[]> {
  if (!options.bundle) {
    return [(await import('vite-plugin-dts')).default()]
  } else {
    let config: ResolvedConfig
    return [
      {
        name: 'dtsBundle',
        configResolved(_config) {
          config = _config
        },
      },
      (await import('vite-plugin-dts')).default({
        outDir: pathe.join(options.outDir ?? 'dist', 'types'),
        async afterBuild() {
          const outDir = options.outDir
            ? pathe.isAbsolute(options.outDir)
              ? options.outDir
              : pathe.resolve(config.root, options.outDir)
            : pathe.resolve(config.root, 'dist')
          await Promise.all(
            options.entry.map(async (it) => {
              const fileName = pathe.basename(it, pathe.extname(it)) + '.d.ts'
              await dtsBundle({
                entry: pathe.resolve(outDir, 'types', fileName),
                outFile: pathe.resolve(outDir, fileName),
              })
            }),
          )
          await rm(pathe.resolve(outDir, 'types'), { force: true, recursive: true })
        },
      }),
    ]
  }
}
