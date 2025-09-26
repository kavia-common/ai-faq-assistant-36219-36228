import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FAQ Assistant title and ask button', () => {
  render(<App />);
  // The title appears as a main page heading
  expect(screen.getByRole('heading', { level: 1, name: /FAQ Assistant/i })).toBeInTheDocument();
  // Verify the Ask action button is present
  expect(screen.getByRole('button', { name: /^Ask$/i })).toBeInTheDocument();
});
