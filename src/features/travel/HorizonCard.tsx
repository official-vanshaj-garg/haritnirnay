import { HorizonProjection } from '../../domain/types';
import { formatApproxKgCO2e } from '../../domain/formatting/carbonFormat';
import { AnalogyList } from './AnalogyList';

interface Props {
  horizon: HorizonProjection;
  frequencyLabel: string;
}

export function HorizonCard({ horizon, frequencyLabel }: Props) {
  return (
    <div className="horizon-card">
      <h4>10-Year Horizon</h4>
      <p className="frequency-note">
        Assumes this decision repeats {frequencyLabel}.
      </p>
      <div className="horizon-impact">
        <span className="big-number">
          {formatApproxKgCO2e(horizon.totalSavedKg)}
        </span>{' '}
        saved over 10 years
      </div>
      <AnalogyList analogies={horizon.analogies} />
    </div>
  );
}
