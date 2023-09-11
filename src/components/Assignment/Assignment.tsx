import { useEffect, useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Country } from './Assignment.types';

const GET_COUNTRIES = gql`
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

export const Assignment = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  const [filterText, setFilterText] = useState<string>('');
  const [selected, setSelected] = useState<string>('');
  const filteredData = useMemo<Country[]>(() => {
    const filtered =
      data?.countries?.filter((item: Country) =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      ) ?? [];
    return filtered;
  }, [data, filterText]);

  const handleFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterText(e.currentTarget.value);
  };

  const toggleSelected = (e: React.SyntheticEvent) => {
    const selectedItemText = e.currentTarget.textContent;

    selected === selectedItemText
      ? setSelected('')
      : setSelected(selectedItemText || '');
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section id="assignment">
      <form id="text-filter">
        <input
          type="text"
          id="text-filter-input"
          name="text-filter-input"
          value={filterText}
          onChange={handleFilterTextChange}
        />
      </form>
      <div className="items">
        <ul>
          {filteredData.map((item) => {
            return (
              <li
                key={item.name}
                className={selected === item.name ? 'selected' : ''}
                onClick={toggleSelected}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
