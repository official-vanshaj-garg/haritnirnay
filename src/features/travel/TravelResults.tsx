import { TravelDecisionResult } from './travelDecisionViewModel';
import { ScoreBreakdown } from './ScoreBreakdown';
import { HorizonCard } from './HorizonCard';
import { AssumptionPanel } from './AssumptionPanel';
import { CarbonReceipt } from './CarbonReceipt';

interface Props {
  result: TravelDecisionResult;
}

export function TravelResults({ result }: Props) {
  if (result.alternatives.length === 0) {
    return (
      <div className="travel-results">
        <CarbonReceipt receipt={result.receipt} />
        <div className="no-results" role="status">
          This choice already looks like the lower-carbon practical option in
          the current Travel flow. You can still review the assumptions below.
        </div>
        <AssumptionPanel assumptions={result.allAssumptions} />
      </div>
    );
  }

  return (
    <div className="travel-results">
      <CarbonReceipt receipt={result.receipt} />

      <h2>Ranked Alternatives</h2>

      <div className="alternatives-list">
        {result.alternatives.map((alt, index) => (
          <div
            key={alt.id}
            className={`alternative-card ${index === 0 ? 'top-ranked' : ''}`}
          >
            <div className="alt-header">
              <h3>
                {index === 0
                  ? `Recommended choice: ${alt.label}`
                  : `Also compare: ${alt.label}`}
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
