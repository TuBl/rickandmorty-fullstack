import {gql, useQuery} from '@apollo/client'
export const CHARACTER_INFO = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      image
      status
      episode {
        name
        air_date
        characters {
          id
          name
        }
      }
      location {
          id
          name
          type
          dimension
          residents {
            id
            name
          }
          created
      }
    }
  }
`

export default function useCharecterInfo(options){  
    return useQuery(CHARACTER_INFO , options);
}