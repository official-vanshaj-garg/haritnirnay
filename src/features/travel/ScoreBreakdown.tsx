import { Recommendation } from '../../domain/types';
import { formatApproxNumber } from '../../domain/formatting/carbonFormat';

interface Props {
  breakdown: Recommendation['scoreBreakdown'];
}

export function ScoreBreakdown({ breakdown }: Props) {
  return (
    <div className="score-breakdown">
      <h4>Show me the math</h4>
      <p>
        Score Math: Score = (Saved Kg &times; Feasibility &times; Context Match)
        - Friction Penalty
      </p>
      <code>
        ({formatApproxNumber(breakdown.savedKg)} &times; {breakdown.feasibility}{' '}
        &times; {breakdown.contextMatch}) - {breakdown.frictionPenalty}
      </code>
    </div>
  );
}
