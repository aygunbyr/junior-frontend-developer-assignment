import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Datatable } from './Datatable';
import { mockColumns, mockData } from './mock.constants';

// TODO: Datatable mocklamaya gerek yok gibi, deneyelim, gerek yoksa silelim. Sadece assignment mocklanmali.

describe('Datatable', () => {
  test('renders countries correctly', async () => {
    render(<Datatable columns={mockColumns} data={mockData.countries} />);
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
});
