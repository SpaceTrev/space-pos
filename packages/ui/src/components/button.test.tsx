import { render, screen } from '@testing-library/react';
import { Button } from './button';
import '@testing-library/jest-dom';

test('renders a button with children', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click Me');
});