# @liuli-util/rollup-plugin-graphql-codegen

一个 vite/rollup 插件，可以在 worker thread 中执行 graphql codegen。

## 配置 GraphQL Codegen

> 参考: [graphql-code-generator](https://www.graphql-code-generator.com/docs/getting-started/installation) 或者 [在 ts 中使用 graphql](https://blog.rxliuli.com/p/349ef4aeec0c466c8566d8383f596941/)

## 安装

```sh
pnpm i -D @liuli-util/rollup-plugin-graphql-codegen @graphql-typed-document-node/core
```

## 使用插件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { gql2TsConfig, graphQLCodegen } from '@liuli-util/rollup-plugin-graphql-codegen'

export default defineConfig({
  plugins: [graphQLCodegen(gql2TsConfig)],
})
```

> 您可以使用单独的 _codegen.yml_ 配置生成器

添加一个 graphql 文件

```graphql
#RepoQuery.gql
fragment Repo on Repository {
  id
  name
}

query findRepoStar($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    ...Repo
    stargazerCount
  }
}
```

生成的类型

```ts
import * as Types from '../graphql.generated'

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type RepoFragment = { __typename?: 'Repository'; id: string; name: string }

export type FindRepoStarQueryVariables = Types.Exact<{
  name: Types.Scalars['String']
  owner: Types.Scalars['String']
}>

export type FindRepoStarQuery = {
  __typename?: 'Query'
  repository?: { __typename?: 'Repository'; stargazerCount: number; id: string; name: string } | null | undefined
}

export const RepoFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Repo' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Repository' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RepoFragment, unknown>
export const FindRepoStarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findRepoStar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'owner' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'repository' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'owner' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'owner' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Repo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stargazerCount' } },
              ],
            },
          },
        ],
      },
    },
    ...RepoFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<FindRepoStarQuery, FindRepoStarQueryVariables>
```

使用

```ts
const res = await client.query({
  query: FindRepoStarDocument,
  variables: {
    name: 'liuli-tools',
    owner: 'rxliuli',
  },
})
console.log('res: ', res.data.repository?.stargazerCount)
```

> 示例项目: [rollup-plugin-graphql-codegen-example](https://github.com/rxliuli/liuli-tools/tree/master/examples/rollup-plugin-graphql-codegen-example)
