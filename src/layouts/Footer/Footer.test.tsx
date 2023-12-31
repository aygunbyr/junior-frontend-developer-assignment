import { render, screen } from '@testing-library/react';

import { Footer } from '.';

test('renders correctly', () => {
  render(<Footer />);

  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();

  const footerText = screen.getByText(/created by/i);
  expect(footerText).toBeInTheDocument();
});
