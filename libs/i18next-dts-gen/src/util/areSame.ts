import { ts } from 'ts-morph'
import { RandomUtil } from './RandomUtil'
import { createMinifier } from 'dts-minify'
import { format } from 'prettier'
/**
 * 比较两个 ts 代码从 ast 上看是否一致
 * 实际上仍然有问题。。。
 * @link https://github.com/dsherret/ts-morph/issues/499#issuecomment-440079701
 * @param text1
 * @param text2
 */
export function areSame(text1: string, text2: string): boolean {
  if (formatCode(text1) === formatCode(text2)) {
    return true
  }
  const tokens1 = getTokens(text1)
  const tokens2 = getTokens(text2)

  let token1 = tokens1.next()
  let token2 = tokens2.next()
  while (!token1.done || !token2.done) {
    token1 = tokens1.next()
    token2 = tokens2.next()

    if (token1.done && token2.done) return true
    if (token1.done || token2.done) return false
    if (token1.value !== token2.value) return false
  }
  return false
}

const minifier = createMinifier(ts)
export function formatCode(text: string): string {
  return format(minifier.minify(text), {
    parser: 'typescript',
  })
}

function* getTokens(text: string): Generator<string, void, unknown> {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, true)
  scanner.setText(formatCode(text))
  scanner.setOnError((message) => console.error(message))
  scanner.setLanguageVariant(getLanguageVariantFromFileName(RandomUtil.string()))

  while (scanner.scan() !== ts.SyntaxKind.EndOfFileToken) yield scanner.getTokenText()
}

function getLanguageVariantFromFileName(fileName: string) {
  const lowerCaseFileName = fileName.toLowerCase()
  const isJsxOrTsxFile = lowerCaseFileName.endsWith('.tsx') || lowerCaseFileName.endsWith('.jsx')
  return isJsxOrTsxFile ? ts.LanguageVariant.JSX : ts.LanguageVariant.Standard
}
