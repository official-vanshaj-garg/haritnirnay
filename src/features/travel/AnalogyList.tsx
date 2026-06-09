import { Analogy } from '../../domain/types';
import { formatApproxNumber } from '../../domain/formatting/carbonFormat';

interface Props {
  analogies: Analogy[];
}

export function AnalogyList({ analogies }: Props) {
  if (analogies.length === 0) return null;

  return (
    <div className="analogy-list">
      <h4>Scale References</h4>
      <p className="analogy-note">Analogies are references, not offsets.</p>
      <ul>
        {analogies.map((a) => (
          <li key={a.id}>
            <strong>{formatApproxNumber(a.equivalentValue)}</strong> {a.unit} (
            {a.label})
          </li>
        ))}
      </ul>
    </div>
  );
}
