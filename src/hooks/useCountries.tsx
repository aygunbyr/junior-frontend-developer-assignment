import { useQuery, gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      capital
      code
      continent {
        name
      }
      currency
      languages {
        name
      }
      native
      name
      phone
    }
  }
`;

export const useCountries = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  return { loading, error, data };
};
