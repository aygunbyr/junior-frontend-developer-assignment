import { useMemo, useState } from 'react';

import styles from './Datatable.module.css';
import { DatatableProps } from './Datatable.types';
import { compareTwoObjects, containsSearchText } from './utils';

export const Datatable = <T extends unknown>({
  columns,
  data,
}: DatatableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const filteredData = useMemo(() => {
    return data?.filter((item) => containsSearchText(item, searchText));
  }, [data, searchText]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData?.slice(startIndex, endIndex);
  }, [currentPage, rowsPerPage, filteredData]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData?.length / rowsPerPage);
  }, [filteredData, rowsPerPage]);

  const handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.currentTarget.value));
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
        onSubmit={handleSubmit}
      >
        <input
          className={styles['datatable__filter-form-input']}
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchTextChange}
        />
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
                  key={index}
                  onClick={() => handleSelectItem(item)}
                >
                  <td>
                    <input type="checkbox" checked={selected} />
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
          <label htmlFor="row-per-page">Row per page:</label>
          <select
            name="row-per-page"
            id="row-per-page"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
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
          {currentPage}
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
