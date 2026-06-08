import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TravelDecisionPage } from '../../../src/features/travel/TravelDecisionPage';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';

describe('TravelDecisionUI', () => {
  it('renders initial state correctly', () => {
    render(<TravelDecisionPage />);
    expect(screen.getByRole('heading', { name: /Travel Advisor/i })).toBeInTheDocument();
    expect(screen.getByText(/Fill out your upcoming travel plans/i)).toBeInTheDocument();
  });

  it('validates invalid inputs', async () => {
    render(<TravelDecisionPage />);
    const distanceInput = screen.getByLabelText(/Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: '-10' } });
    fireEvent.click(screen.getByRole('button', { name: /Evaluate Alternatives/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Distance must be greater than 0/i)).toBeInTheDocument();
    });
  });

  it('submits valid input and displays results, assumptions, horizon, and breakdown', async () => {
    render(<TravelDecisionPage />);
    const distanceInput = screen.getByLabelText(/Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /Evaluate Alternatives/i }));

    // Ranked alternatives
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Ranked Alternatives/i })).toBeInTheDocument();
    });
    
    // Check if the top rank is Train or Bus
    expect(screen.getAllByText(/Score:/i)[0]).toBeInTheDocument();

    // Check Score breakdown
    expect(screen.getAllByText(/Score Math/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Score = \(Saved Kg/i)[0]).toBeInTheDocument();

    // Check Assumption visibility
    expect(screen.getByRole('heading', { name: /Transparent Assumptions/i })).toBeInTheDocument();
    expect(screen.getByText(/Petrol Car Emissions:/i)).toBeInTheDocument();

    // Check Horizon visibility
    expect(screen.getAllByRole('heading', { name: /10-Year Horizon/i })[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Assumes this decision repeats once per week/i)[0]).toBeInTheDocument();
    
    // Check Analogies
    expect(screen.getAllByRole('heading', { name: /Relatable Impact/i })[0]).toBeInTheDocument();
  });

  it('passes basic accessibility check', async () => {
    const { container } = render(<TravelDecisionPage />);
    
    // Test initial state
    let results = await axe(container);
    expect(results).toHaveNoViolations();

    // Test results state
    const distanceInput = screen.getByLabelText(/Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /Evaluate Alternatives/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Ranked Alternatives/i })).toBeInTheDocument();
    });

    results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
