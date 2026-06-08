import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../../src/app/App';

describe('App Smoke Test', () => {
  it('renders the application thesis', () => {
    render(<App />);
    expect(screen.getByText(/HaritNirnay does not ask what did you emit/i)).toBeInTheDocument();
  });
});
