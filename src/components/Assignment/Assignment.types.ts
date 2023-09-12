export type Country = {
  __typename?: string;
  capital: string | null;
  code: string;
  continent: {
    __typename?: string;
    name: string;
  };
  currency: string | null;
  languages: {
    __typename?: string;
    name: string;
  }[];
  native: string;
  name: string;
  phone: string;
};
