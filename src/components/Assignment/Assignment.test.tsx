import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { Assignment } from './Assignment';
import { GET_COUNTRIES } from '../../hooks/useCountries';
import { mockData } from './mock.constants';

describe('Assignment', () => {
  const mocks = [
    {
      request: {
        query: GET_COUNTRIES,
      },
      result: {
        data: mockData,
      },
    },
  ];

  test('renders countries correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Assignment />
      </MockedProvider>
    );

    const loadingText = await screen.findByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    const countryElement = await screen.findByText('Andorra');
    expect(countryElement).toBeInTheDocument();
  });

  test('handles filter text change correctly', async () => {
    userEvent.setup();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Assignment />
      </MockedProvider>
    );

    let listItems;

    listItems = await screen.findAllByRole('listitem');

    expect(listItems.length).toBe(10);

    const filterInput = screen.getByRole('textbox', {
      name: /search/i,
    });

    await userEvent.type(filterInput, 'andorra');

    expect(filterInput).toHaveValue('andorra');

    listItems = await screen.findAllByRole('listitem');

    expect(listItems.length).toBe(1);
  });

  test('handles select country correctly', async () => {
    userEvent.setup();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Assignment />
      </MockedProvider>
    );

    const listItem = await screen.findByText('Andorra');

    await userEvent.click(listItem);

    const selectedItem = await screen.findByTestId('selected');

    expect(selectedItem.textContent).toStrictEqual('Andorra');
  });
});
