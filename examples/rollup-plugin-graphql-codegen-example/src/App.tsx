import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useMount } from 'react-use'
import { FindRepoStarQuery, FindRepoStarQueryVariables } from './api/query.gql'
import { findRepoStar } from './api/query'

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
      query: findRepoStar,
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
