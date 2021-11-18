import { gql } from '@apollo/client'

export const findRepoStar = gql`
  query findRepoStar($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      stargazerCount
    }
  }
`
export const findRepo = gql`
  query findRepo($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
    }
  }
`
