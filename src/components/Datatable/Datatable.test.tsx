import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Datatable } from './Datatable';
import { mockColumns, mockData } from './mock.constants';

describe('Datatable', () => {
  test('renders countries correctly', async () => {
    render(<Datatable columns={mockColumns} data={mockData.countries} />);

    const selectedItems = screen.getAllByTestId('selected');
    expect(selectedItems.length).toBe(1);
    expect(selectedItems[0]).toBeInTheDocument();

    const notSelectedItems = screen.getAllByTestId('not-selected');
    expect(notSelectedItems.length).toBe(9);

    const perPageSelect = screen.getByRole('combobox', {
      name: /rows per page/i,
    });

    expect(perPageSelect).toBeInTheDocument();
  });

  test('handles filter text change correctly', async () => {
    userEvent.setup();

    render(<Datatable columns={mockColumns} data={mockData.countries} />);

    const rows = await screen.findAllByRole('row');

    expect(rows.length).toBe(11);

    const filterInput = screen.getByRole('textbox');

    await userEvent.type(filterInput, 'afghanistan');

    expect(filterInput).toHaveValue('afghanistan');

    const filteredCells = await screen.findAllByRole('cell', {
      name: /afghanistan/i,
    });

    expect(filteredCells.length).toBe(1);
  });

  test('handles select country correctly', async () => {
    userEvent.setup();

    render(<Datatable columns={mockColumns} data={mockData.countries} />);

    const country = await screen.findByText(/afghanistan/i);

    await userEvent.click(country);

    const selectedItems = screen.queryAllByTestId('selected');

    expect(selectedItems.length).toBe(1);

    await userEvent.click(country);

    const newSelectedItems = screen.queryAllByTestId('selected');

    expect(newSelectedItems.length).toBe(0);
  });

  test('handles filter form submit correctly', async () => {
    userEvent.setup();

    render(<Datatable columns={mockColumns} data={mockData.countries} />);

    const filterInput = screen.getByRole('textbox');

    await userEvent.type(filterInput, 'search:afghanistan group:capital');

    const filterButton = screen.getByRole('button', { name: /filter/i });

    await userEvent.click(filterButton);

    const rows = screen.queryAllByRole('row');

    expect(rows.length).toBe(2);
  });

  test('handles filter form submit and gives alert when query is invalid', async () => {
    userEvent.setup();

    render(<Datatable columns={mockColumns} data={mockData.countries} />);

    const filterInput = screen.getByRole('textbox');

    await userEvent.type(filterInput, 'wrong format');

    const filterButton = screen.getByRole('button', { name: /filter/i });

    const spy = jest.spyOn(window, 'alert');

    await userEvent.click(filterButton);

    expect(spy).toHaveBeenCalled();
  });

  test('handles change per page and change current page correctly', async () => {
    userEvent.setup();
    render(<Datatable columns={mockColumns} data={mockData.countries} />);

    const perPageSelect = screen.getByRole('combobox', {
      name: /rows per page/i,
    });

    await userEvent.selectOptions(perPageSelect, '5');

    let pageNumber = screen.getByTestId('page-number');

    expect(pageNumber).toHaveTextContent('1');

    const nextButton = screen.getByRole('button', {
      name: /next/i,
    });

    await userEvent.click(nextButton);

    expect(pageNumber).toHaveTextContent('2');

    const previousButton = screen.getByRole('button', {
      name: /previous/i,
    });

    await userEvent.click(previousButton);

    expect(pageNumber).toHaveTextContent('1');
  });

  test('handles change selected item correctly', async () => {
    userEvent.setup();

    render(<Datatable columns={mockColumns} data={mockData.countries} />);

    const checkboxes = screen.getAllByRole('checkbox');

    await userEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();

    await userEvent.click(checkboxes[1]);

    expect(checkboxes[1]).toBeChecked();

    expect(checkboxes[0]).not.toBeChecked();
  });
});
