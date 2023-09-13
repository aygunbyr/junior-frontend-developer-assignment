import { Country } from "../Assignment/Assignment.types";
import { ColumnProps } from "./Datatable.types";

export const mockData = {
  countries: [
    {
      __typename: 'Country',
      capital: 'Andorra la Vella',
      code: 'AD',
      continent: {
        __typename: 'Continent',
        name: 'Europe',
      },
      currency: 'EUR',
      languages: [
        {
          __typename: 'Language',
          name: 'Catalan',
        },
      ],
      native: 'Andorra',
      name: 'Andorra',
      phone: '376',
    },
    {
      __typename: 'Country',
      capital: 'Abu Dhabi',
      code: 'AE',
      continent: {
        __typename: 'Continent',
        name: 'Asia',
      },
      currency: 'AED',
      languages: [
        {
          __typename: 'Language',
          name: 'Arabic',
        },
      ],
      native: 'دولة الإمارات العربية المتحدة',
      name: 'United Arab Emirates',
      phone: '971',
    },
    {
      __typename: 'Country',
      capital: 'Kabul',
      code: 'AF',
      continent: {
        __typename: 'Continent',
        name: 'Asia',
      },
      currency: 'AFN',
      languages: [
        {
          __typename: 'Language',
          name: 'Pashto',
        },
        {
          __typename: 'Language',
          name: 'Uzbek',
        },
        {
          __typename: 'Language',
          name: 'Turkmen',
        },
      ],
      native: 'افغانستان',
      name: 'Afghanistan',
      phone: '93',
    },
    {
      __typename: 'Country',
      capital: "Saint John's",
      code: 'AG',
      continent: {
        __typename: 'Continent',
        name: 'North America',
      },
      currency: 'XCD',
      languages: [
        {
          __typename: 'Language',
          name: 'English',
        },
      ],
      native: 'Antigua and Barbuda',
      name: 'Antigua and Barbuda',
      phone: '1268',
    },
    {
      __typename: 'Country',
      capital: 'The Valley',
      code: 'AI',
      continent: {
        __typename: 'Continent',
        name: 'North America',
      },
      currency: 'XCD',
      languages: [
        {
          __typename: 'Language',
          name: 'English',
        },
      ],
      native: 'Anguilla',
      name: 'Anguilla',
      phone: '1264',
    },
    {
      __typename: 'Country',
      capital: 'Tirana',
      code: 'AL',
      continent: {
        __typename: 'Continent',
        name: 'Europe',
      },
      currency: 'ALL',
      languages: [
        {
          __typename: 'Language',
          name: 'Albanian',
        },
      ],
      native: 'Shqipëria',
      name: 'Albania',
      phone: '355',
    },
    {
      __typename: 'Country',
      capital: 'Yerevan',
      code: 'AM',
      continent: {
        __typename: 'Continent',
        name: 'Asia',
      },
      currency: 'AMD',
      languages: [
        {
          __typename: 'Language',
          name: 'Armenian',
        },
        {
          __typename: 'Language',
          name: 'Russian',
        },
      ],
      native: 'Հայաստան',
      name: 'Armenia',
      phone: '374',
    },
    {
      __typename: 'Country',
      capital: 'Luanda',
      code: 'AO',
      continent: {
        __typename: 'Continent',
        name: 'Africa',
      },
      currency: 'AOA',
      languages: [
        {
          __typename: 'Language',
          name: 'Portuguese',
        },
      ],
      native: 'Angola',
      name: 'Angola',
      phone: '244',
    },
    {
      __typename: 'Country',
      capital: null,
      code: 'AQ',
      continent: {
        __typename: 'Continent',
        name: 'Antarctica',
      },
      currency: null,
      languages: [],
      native: 'Antarctica',
      name: 'Antarctica',
      phone: '672',
    },
    {
      __typename: 'Country',
      capital: 'Buenos Aires',
      code: 'AR',
      continent: {
        __typename: 'Continent',
        name: 'South America',
      },
      currency: 'ARS',
      languages: [
        {
          __typename: 'Language',
          name: 'Spanish',
        },
        {
          __typename: 'Language',
          name: 'Guarani',
        },
      ],
      native: 'Argentina',
      name: 'Argentina',
      phone: '54',
    },
  ],
};

export const mockColumns: ColumnProps<Country>[] = [
  {
    key: 'name',
    label: 'name',
  },
  {
    key: 'capital',
    label: 'capital',
  },
  {
    key: 'code',
    label: 'code',
  },
  {
    key: 'currency',
    label: 'currency',
  },
  {
    key: 'native',
    label: 'native',
  },
  {
    key: 'phone',
    label: 'phone',
  },
];