import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FAQ Assistant title and ask button', () => {
  render(<App />);
  expect(screen.getByText(/FAQ Assistant/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ask/i })).toBeInTheDocument();
});
