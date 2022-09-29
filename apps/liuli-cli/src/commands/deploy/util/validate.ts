import Ajv, { JSONSchemaType } from 'ajv'
import localize from 'ajv-i18n/localize'
import formatsPlugin from 'ajv-formats'

/**
 * 使用 ajv 校验数据
 * @param schema json 模式配置
 * @param data 校验的数据
 */
export function validate<T>(schema: JSONSchemaType<T>, data: T): [isValid: boolean, errorText: string] {
  const ajv = new Ajv({
    allErrors: true,
    messages: false,
  })

  formatsPlugin(ajv)
  const res = ajv.validate(schema, data)

  if (!res) {
    localize.zh(ajv.errors)
  }

  return [res, ajv.errorsText()]
}
