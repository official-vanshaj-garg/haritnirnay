import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ASSUMPTIONS } from '../../../src/domain/factors/assumptionCatalog';
import { AssumptionPanel } from '../../../src/features/travel/AssumptionPanel';

const petrolCarAssumption = ASSUMPTIONS.petrol_car_emissions;

describe('AssumptionPanel', () => {
  it('renders confidence text', () => {
    render(<AssumptionPanel assumptions={[petrolCarAssumption]} />);

    expect(screen.getByText(/Confidence: Low/i)).toBeInTheDocument();
  });

  it('renders source and provenance text', () => {
    render(<AssumptionPanel assumptions={[petrolCarAssumption]} />);

    expect(screen.getAllByText(/Internal estimate/i)[0]).toBeInTheDocument();
    expect(
      screen.getByText(
        /Needs verification before use as formal carbon accounting/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Order-of-magnitude estimates, not billable carbon accounting/i
      )
    ).toBeInTheDocument();
  });

  it('has no accessibility violations when provenance details are expanded', async () => {
    const { container } = render(
      <AssumptionPanel assumptions={[petrolCarAssumption]} />
    );

    container.querySelectorAll('details').forEach((detailsElement) => {
      detailsElement.open = true;
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
