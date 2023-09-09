import { useState, useEffect, useMemo } from 'react';

import { fetchData } from '../../api';
import { Person } from './Assignment.types';

export const Assignment = () => {
  const [data, setData] = useState<Person[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [selected, setSelected] = useState<string>('');
  const filteredData = useMemo<Person[]>(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
    return filtered;
  }, [data, filterText]);

  useEffect(() => {
    fetchData()
      .then((results) => {
        setData(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterText(e.currentTarget.value);
  };

  const toggleSelected = (e: React.SyntheticEvent) => {
    const selectedItemText = e.currentTarget.textContent;

    selected === selectedItemText
      ? setSelected('')
      : setSelected(selectedItemText || '');
  };

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
