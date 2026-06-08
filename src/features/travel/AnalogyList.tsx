import { Analogy } from '../../domain/types';

interface Props {
  analogies: Analogy[];
}

export function AnalogyList({ analogies }: Props) {
  if (analogies.length === 0) return null;

  return (
    <div className="analogy-list">
      <h4>Relatable Impact</h4>
      <ul>
        {analogies.map((a) => (
          <li key={a.id}>
            <strong>{a.equivalentValue.toFixed(1)}</strong> {a.unit} ({a.label})
          </li>
        ))}
      </ul>
    </div>
  );
}
