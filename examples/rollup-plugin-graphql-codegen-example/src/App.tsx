import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useMount } from 'react-use'
import { FindRepoStarDocument } from './api/RepoQuery.generated'
import React from 'react'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
  },
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  useMount(async () => {
    const res = await client.query({
      query: FindRepoStarDocument,
      variables: {
        name: 'liuli-tools',
        owner: 'rxliuli',
      },
    })
    console.log('res: ', res.data.repository?.stargazerCount)
  })
  return <div>app</div>
}

export default App
