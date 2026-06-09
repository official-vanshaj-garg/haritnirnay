import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { TravelDecisionPage } from '../../../src/features/travel/TravelDecisionPage';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';

describe('TravelDecisionUI', () => {
  it('renders initial state correctly', () => {
    render(<TravelDecisionPage />);
    expect(
      screen.getByRole('heading', { name: /Travel Advisor/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Fill out your upcoming travel plans/i)
    ).toBeInTheDocument();
  });

  it('shows a ghost alternative preview only when the form input is valid', () => {
    render(<TravelDecisionPage />);

    expect(screen.getByRole('status')).toHaveTextContent(
      /Before you choose Petrol Car/i
    );

    const distanceInput = screen.getByLabelText(/Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: '-10' } });

    expect(
      screen.queryByText(/Before you choose Petrol Car/i)
    ).not.toBeInTheDocument();
  });

  it('shows supportive ghost preview copy for an already lower-carbon choice', () => {
    render(<TravelDecisionPage />);

    fireEvent.change(screen.getByLabelText(/Current Mode Choice/i), {
      target: { value: 'train' },
    });

    expect(screen.getByRole('status')).toHaveTextContent(
      /Train already looks like a lower-carbon practical choice/i
    );
  });

  it('mirrors the selected travel mode in the CTA', () => {
    render(<TravelDecisionPage />);

    expect(
      screen.getByRole('button', { name: /Compare my petrol car choice/i })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Current Mode Choice/i), {
      target: { value: 'train' },
    });

    expect(
      screen.getByRole('button', { name: /Compare my train choice/i })
    ).toBeInTheDocument();
  });

  it('validates invalid inputs', async () => {
    render(<TravelDecisionPage />);
    const distanceInput = screen.getByLabelText(/Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: '-10' } });
    fireEvent.click(
      screen.getByRole('button', { name: /Compare my petrol car choice/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Distance must be greater than 0/i)
      ).toBeInTheDocument();
    });
  });

  it('submits valid input and displays results, assumptions, horizon, and breakdown', async () => {
    render(<TravelDecisionPage />);
    const distanceInput = screen.getByLabelText(/Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: '50' } });
    fireEvent.click(
      screen.getByRole('button', { name: /Compare my petrol car choice/i })
    );

    // Ranked alternatives
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Ranked Alternatives/i })
      ).toBeInTheDocument();
    });

    // Check if the top rank is Train or Bus
    expect(screen.getAllByText(/Score:/i)[0]).toBeInTheDocument();

    // Check Score breakdown
    expect(screen.getAllByText(/Show me the math/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Score Math/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Score = \(Saved Kg/i)[0]).toBeInTheDocument();

    // Check Assumption visibility
    expect(
      screen.getByRole('heading', { name: /Transparent Assumptions/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Petrol Car Emissions:/i)).toBeInTheDocument();

    // Check Horizon visibility
    expect(
      screen.getAllByRole('heading', { name: /10-Year Horizon/i })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Assumes this decision repeats once per week/i)[0]
    ).toBeInTheDocument();

    // Check Analogies
    expect(
      screen.getAllByRole('heading', { name: /Scale References/i })[0]
    ).toBeInTheDocument();
  });

  it('renders a carbon receipt after submit', async () => {
    render(<TravelDecisionPage />);

    fireEvent.click(
      screen.getByRole('button', { name: /Compare my petrol car choice/i })
    );

    const receipt = await screen.findByRole('article', {
      name: /Carbon receipt/i,
    });

    expect(within(receipt).getByText(/^Current choice$/i)).toBeInTheDocument();
    expect(
      within(receipt).getAllByText(/^Petrol Car$/i)[0]
    ).toBeInTheDocument();
    expect(
      within(receipt).getAllByText(/Recommended choice/i)[0]
    ).toBeInTheDocument();
    expect(within(receipt).getAllByText(/^Local Bus$/i)[0]).toBeInTheDocument();
    expect(
      within(receipt).getAllByText(/about 1.7 kg CO2e/i)[0]
    ).toBeInTheDocument();
    expect(
      within(receipt).getAllByText(/about 900 kg CO2e/i)[0]
    ).toBeInTheDocument();
    expect(within(receipt).getByText(/^Confidence$/i)).toBeInTheDocument();
    expect(within(receipt).getByText(/^Low$/i)).toBeInTheDocument();
    expect(
      within(receipt).getByText(
        /Order-of-magnitude estimates, not billable carbon accounting/i
      )
    ).toBeInTheDocument();
  });

  it('renders the carbon cut decision slice', async () => {
    render(<TravelDecisionPage />);

    fireEvent.click(
      screen.getByRole('button', { name: /Compare my petrol car choice/i })
    );

    const receipt = await screen.findByRole('article', {
      name: /Carbon receipt/i,
    });

    expect(
      within(receipt).getByRole('heading', {
        name: /Carbon Cut \/ Decision Slice/i,
      })
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Current choice carbon/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Recommended choice carbon/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Carbon avoided today/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Carbon avoided over 10 years/i)
    ).toBeInTheDocument();
    expect(within(receipt).getByText(/about 3.8 kg CO2e/i)).toBeInTheDocument();
    expect(within(receipt).getByText(/about 2.1 kg CO2e/i)).toBeInTheDocument();
    expect(
      within(receipt).getAllByText(/about 1.7 kg CO2e/i)[0]
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(
        /Comparison estimate only. Not carbon accounting/i
      )
    ).toBeInTheDocument();
  });

  it('renders the receipt trust strip and 10-year fork', async () => {
    render(<TravelDecisionPage />);

    fireEvent.click(
      screen.getByRole('button', { name: /Compare my petrol car choice/i })
    );

    const receipt = await screen.findByRole('article', {
      name: /Carbon receipt/i,
    });

    expect(within(receipt).getByText(/Local-only/i)).toBeInTheDocument();
    expect(within(receipt).getByText(/No tracking/i)).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Static assumptions/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Useful for comparison/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByRole('heading', { name: /10-Year Fork/i })
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Keep current choice/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/Switch to recommendation/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/about 2,000 kg CO2e/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/about 1,100 kg CO2e/i)
    ).toBeInTheDocument();
  });

  it('renders an honest carbon cut state when the selected mode is already recommended', async () => {
    render(<TravelDecisionPage />);

    fireEvent.change(screen.getByLabelText(/Current Mode Choice/i), {
      target: { value: 'train' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: /Compare my train choice/i })
    );

    const receipt = await screen.findByRole('article', {
      name: /Carbon receipt/i,
    });

    expect(
      within(receipt).getByText(
        /You are already near the lower-impact recommendation/i
      )
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(/No positive avoided carbon identified/i)
    ).toBeInTheDocument();
    expect(
      within(receipt).getByText(
        /No positive 10-year avoided carbon identified/i
      )
    ).toBeInTheDocument();
    expect(
      within(receipt).getAllByText(/about 0.82 kg CO2e/i)[0]
    ).toBeInTheDocument();
    expect(
      within(receipt).getAllByText(/about 430 kg CO2e/i)[0]
    ).toBeInTheDocument();
  });

  it('passes basic accessibility check', async () => {
    const { container } = render(<TravelDecisionPage />);

    // Test initial state
    let results = await axe(container);
    expect(results).toHaveNoViolations();

    // Test results state
    const distanceInput = screen.getByLabelText(/Distance \(km\)/i);
    fireEvent.change(distanceInput, { target: { value: '50' } });
    fireEvent.click(
      screen.getByRole('button', { name: /Compare my petrol car choice/i })
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Ranked Alternatives/i })
      ).toBeInTheDocument();
    });

    results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
