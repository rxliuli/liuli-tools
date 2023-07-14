import { initTempPath } from '@liuli-util/test'
import { Extractor, ExtractorConfig, ExtractorResult, IConfigFile } from '@microsoft/api-extractor'
import { expect, it } from 'vitest'
import pathe from 'pathe'
import { writeFile } from 'fs/promises'
import { fs } from 'zx'

const tempPath = initTempPath(__filename)

it('basic', async () => {
  await Promise.all([
    writeFile(pathe.resolve(tempPath, 'add.d.ts'), `export declare const add: (a: number, b: number) => number`),
    writeFile(pathe.resolve(tempPath, 'index.d.ts'), `export * from './add'`),
    writeFile(
      pathe.resolve(tempPath, 'api-extractor.json'),
      JSON.stringify({
        $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
        mainEntryPointFilePath: pathe.resolve(tempPath, 'index.d.ts'),
        dtsRollup: {
          enabled: true,
          untrimmedFilePath: pathe.resolve(tempPath, 'dist/index.d.ts'),
        },
        tsdocMetadata: { enabled: false },
        apiReport: { enabled: false },
        docModel: { enabled: false },
      } as IConfigFile),
    ),
  ])
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(pathe.join(tempPath, 'api-extractor.json'))
  const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  })

  if (extractorResult.succeeded) {
    console.log(`API Extractor completed successfully`)
    process.exitCode = 0
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`,
    )
    process.exitCode = 1
  }
  expect(await fs.pathExists(pathe.resolve(tempPath, 'dist/index.d.ts'))).true
})
