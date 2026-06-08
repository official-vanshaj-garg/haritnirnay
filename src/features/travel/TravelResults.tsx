import { TravelDecisionResult } from './travelDecisionViewModel';
import { ScoreBreakdown } from './ScoreBreakdown';
import { HorizonCard } from './HorizonCard';
import { AssumptionPanel } from './AssumptionPanel';

interface Props {
  result: TravelDecisionResult;
}

export function TravelResults({ result }: Props) {
  if (result.alternatives.length === 0) {
    return (
      <div className="no-results" role="alert">
        No viable lower-carbon alternatives found for this input.
      </div>
    );
  }

  return (
    <div className="travel-results">
      <h2>Ranked Alternatives</h2>

      <div className="alternatives-list">
        {result.alternatives.map((alt, index) => (
          <div
            key={alt.id}
            className={`alternative-card ${index === 0 ? 'top-ranked' : ''}`}
          >
            <div className="alt-header">
              <h3>
                #{index + 1}: {alt.label}
              </h3>
              <span className="alt-score">Score: {alt.score.toFixed(1)}</span>
            </div>
            <p className="alt-reason">{alt.reason}</p>

            <div className="alt-details">
              <ScoreBreakdown breakdown={alt.scoreBreakdown} />
              <HorizonCard
                horizon={alt.horizon}
                frequencyLabel="once per week"
              />
            </div>
          </div>
        ))}
      </div>

      <AssumptionPanel assumptions={result.allAssumptions} />
    </div>
  );
}
