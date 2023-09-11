import { useState, useMemo } from 'react';

import { Country } from '../../types';
import { useCountries } from '../../hooks/useCountries';

export const Assignment = () => {
  const { loading, error, data } = useCountries();
  const [filterText, setFilterText] = useState<string>('');
  const [selected, setSelected] = useState<string>('');

  const filteredData = useMemo<Country[]>(() => {
    if (!data || !data.countries) {
      return [];
    }

    const filterLowerCase = filterText.toLowerCase();

    // TODO: change let => const
    let filtered = data.countries.filter((item: Country) =>
      item.name.toLowerCase().includes(filterLowerCase)
    );

    // TODO: remove this
    filtered = filtered.slice(0, 10);

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
