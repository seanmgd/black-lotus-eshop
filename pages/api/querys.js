import { gql } from "@apollo/client";

export const SINGLE_PLANT_QUERY = gql`
  query SingleProduct ($slug: String!) {
    product(slug: $slug){
      id 
      name
    }
}
`;

export const ALL_PLANTS_QUERY = gql`
  query allPlants {
    products {
        name
        price
        image
        slug
      }
    }
`;