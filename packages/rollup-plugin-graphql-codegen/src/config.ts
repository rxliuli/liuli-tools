import { Types } from '@graphql-codegen/plugin-helpers'

/**
 * 从 ts 标签字符串中生成类型定义
 * @deprecated 已废弃，推荐使用 {@link gql2TsConfig}
 */
export const tagStr2DtsConfig: Types.Config = {
  overwrite: true,
  schema: 'schema.graphql',
  generates: {
    './src/graphql.gql.ts': {
      plugins: ['typescript'],
    },
    './': {
      documents: ['src/**/*.ts', '!src/**/*.gql.ts'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: './src/graphql.gql.ts',
        extension: '.gql.ts',
      },
      plugins: ['typescript-operations'],
    },
  },
}

/**
 * 从 gql 文件中生成类型定义
 */
export const gql2TsConfig: Types.Config = {
  overwrite: true,
  schema: 'schema.graphql',
  generates: {
    './src/graphql.generated.ts': {
      plugins: ['typescript'],
    },
    './': {
      documents: ['src/**/*.gql'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: './src/graphql.generated.ts',
        extension: '.generated.ts',
      },
      plugins: ['typescript-operations', 'typed-document-node'],
    },
  },
}
