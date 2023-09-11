import { render, screen } from '@testing-library/react';

import { Header } from '.';

test('renders correctly', () => {
  render(<Header />);
  const banner = screen.getByRole('banner');
  expect(banner).toBeInTheDocument();

  const heading = screen.getByRole('heading', {
    name: /junior frontend developer assignment/i,
  });
  expect(heading).toBeInTheDocument();
});
