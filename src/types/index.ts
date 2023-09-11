export type Country = {
  capital: string;
  code: string;
  continent: {
    name: string;
  };
  currency: string;
  languages: {
    name: string;
  }[];
  native: string;
  name: string;
  phone: string;
};
