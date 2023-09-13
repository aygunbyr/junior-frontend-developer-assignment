import { useMemo, useState } from 'react';

import styles from './Datatable.module.css';
import { DatatableProps } from './Datatable.types';
import {
  comparator,
  compareTwoObjects,
  containsSearchText,
  extractValuesFromSearchText,
} from './utils';

export const Datatable = <T extends {}>({
  columns,
  data,
}: DatatableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [filterText, setFilterText] = useState('');
  const [group, setGroup] = useState<keyof T | null>(null);

  const filteredData = useMemo(() => {
    const filtered = data
      ?.filter((item) => containsSearchText(item, filterText))
      .sort((a, b) => comparator<T>(a, b, group as keyof T));

    if (filtered.length > 10) {
      const tenthElement = filtered[9];
      setSelectedItem(tenthElement);
    } else {
      const lastElement = filtered.slice(-1)[0];
      setSelectedItem(lastElement);
    }

    return filtered;
  }, [data, filterText, group]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData?.slice(startIndex, endIndex);

    return paginatedData;
  }, [currentPage, rowsPerPage, filteredData]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData?.length / rowsPerPage);
  }, [filteredData, rowsPerPage]);

  const handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { filterText: newFilterText, group: newGroup } =
      extractValuesFromSearchText(searchText);

    if (data && !data[0].hasOwnProperty(newGroup)) {
      alert('Group name is invalid');
      return;
    }

    setFilterText(newFilterText);
    setGroup(newGroup as keyof T);
    setCurrentPage(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.currentTarget.value));
    setCurrentPage(1);
  };

  const handleSelectItem = (item: T) => {
    compareTwoObjects(item, selectedItem)
      ? setSelectedItem(null)
      : setSelectedItem(item);
  };

  return (
    <section className={styles.datatable}>
      <form
        className={styles['datatable__filter-form']}
        onSubmit={handleFilterSubmit}
      >
        <input
          className={styles['datatable__filter-form-input']}
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <button
          className={styles['datatable__button']}
          data-testid="filter-submit"
        >
          Filter
        </button>
      </form>
      <div className={styles['datatable__table-wrapper']}>
        <table className={styles['datatable__table']}>
          <thead>
            <tr>
              <th></th>
              {columns.map((column) => (
                <th key={String(column.key)}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item, index) => {
              const selected = compareTwoObjects(item, selectedItem);

              return (
                <tr
                  className={selected ? styles['datatable__selected'] : ''}
                  data-testid={selected ? 'selected' : 'not-selected'}
                  key={index}
                  onClick={() => handleSelectItem(item)}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleSelectItem(item)}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={String(column.key)}>{String(item[column.key])}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles['datatable__wrapper']}>
        <form
          className={styles['datatable__form-per-page']}
          onSubmit={handleSubmit}
        >
          <label htmlFor="row-per-page">Rows per page:</label>
          <select
            name="row-per-page"
            id="row-per-page"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </form>
        <div className={styles['datatable__pagination']}>
          <button
            className={styles['datatable__button']}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span data-testid="page-number">{currentPage}</span>
          <button
            className={styles['datatable__button']}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
