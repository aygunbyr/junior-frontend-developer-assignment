import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { GET_COUNTRIES } from '../../hooks/useCountries';
import { mockColumns, mockData } from '../Datatable/mock.constants';

import { Assignment } from './Assignment';

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

  test('renders correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Assignment />
      </MockedProvider>
    );

    const loadingText = await screen.findByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    const countryElement = await screen.findByText(/afghanistan/i);
    expect(countryElement).toBeInTheDocument();
  });
});
