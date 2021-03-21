import { useQuery, gql } from '@apollo/client';

const CHARECTERS_LIST = gql`
query CharectersList($page: Int!, $filter: FilterCharacter!){
  characters
    (page: $page, filter: $filter) {
        info {
          pages
        }
        results {
          id
          name
          image
        }
      }
  }
`;

export default function useCharecterList(options){  
    return useQuery(CHARECTERS_LIST, options);
}