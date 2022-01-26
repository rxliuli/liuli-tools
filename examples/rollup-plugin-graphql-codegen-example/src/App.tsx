import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useMount } from 'react-use'
import { FindRepoStar, FindRepoStarQuery, FindRepoStarQueryVariables } from './api/RepoQuery.generated'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
  },
  cache: new InMemoryCache(),
})

function App() {
  useMount(async () => {
    const res = await client.query<FindRepoStarQuery, FindRepoStarQueryVariables>({
      query: FindRepoStar,
      variables: {
        name: 'liuli-tools',
        owner: 'rxliuli',
      },
    })
    console.log('res: ', res)
  })
  return <div>app</div>
}

export default App
