import { Assumption } from '../../domain/types';

interface Props {
  assumptions: Assumption[];
}

export function AssumptionPanel({ assumptions }: Props) {
  if (assumptions.length === 0) return null;

  return (
    <div className="assumption-panel">
      <h3>Transparent Assumptions</h3>
      <p>We believe you should see the math before you act.</p>
      <ul className="assumption-list">
        {assumptions.map((a) => (
          <li key={a.id}>
            <strong>{a.label}:</strong> {a.value} {a.unit}
            <div className="assumption-meta">
              <em>{a.sourceNote}</em> (Limitations: {a.limitation})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
