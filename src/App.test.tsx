import { render, screen } from '@testing-library/react';
import App from './App';

test('renders layout', () => {
  render(<App />);

  const header = screen.getByRole('banner');
  expect(header).toBeInTheDocument();

  const main = screen.getByRole('main');
  expect(main).toBeInTheDocument();

  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();
});
