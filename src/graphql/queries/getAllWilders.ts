import { gql } from "@apollo/client";

export const GET_ALL_WILDERS = gql`
  query Query {
    getAllWilders {
      name
      id
      city
      description
      avatar
      grades {
        grade
        skill {
          name
        }
      }
    }
  }
`;
