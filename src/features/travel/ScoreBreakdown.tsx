import { Recommendation } from '../../domain/types';

interface Props {
  breakdown: Recommendation['scoreBreakdown'];
}

export function ScoreBreakdown({ breakdown }: Props) {
  return (
    <div className="score-breakdown">
      <h4>Score Math</h4>
      <p>
        Score = (Saved Kg &times; Feasibility &times; Context Match) - Friction
        Penalty
      </p>
      <code>
        ({breakdown.savedKg.toFixed(2)} &times; {breakdown.feasibility} &times;{' '}
        {breakdown.contextMatch}) - {breakdown.frictionPenalty}
      </code>
    </div>
  );
}
