import { Assumption } from '../../domain/types';
import { CONFIDENCE_LABELS } from '../../domain/provenance';
import { formatApproxUnitValue } from '../../domain/formatting/carbonFormat';

interface Props {
  assumptions: Assumption[];
}

export function AssumptionPanel({ assumptions }: Props) {
  if (assumptions.length === 0) return null;

  return (
    <div className="assumption-panel">
      <h3>Transparent Assumptions</h3>
      <p className="assumption-disclaimer">
        Order-of-magnitude estimates, not billable carbon accounting.
      </p>
      <ul className="assumption-list">
        {assumptions.map((a) => (
          <li key={a.id}>
            <div className="assumption-summary-row">
              <div>
                <strong>{a.label}:</strong>{' '}
                {formatApproxUnitValue(a.value, a.unit)}
              </div>
              <div className="assumption-provenance-summary">
                <span>
                  Confidence: {CONFIDENCE_LABELS[a.provenance.confidence]}
                </span>
                <span>Source: {a.provenance.sourceLabel}</span>
              </div>
            </div>
            <details className="assumption-details">
              <summary>Source and limitations</summary>
              <dl>
                <div>
                  <dt>Basis</dt>
                  <dd>{a.sourceNote}</dd>
                </div>
                <div>
                  <dt>Limitations</dt>
                  <dd>{a.limitation}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>
                    {a.provenance.url ? (
                      <a href={a.provenance.url}>{a.provenance.sourceLabel}</a>
                    ) : (
                      a.provenance.sourceLabel
                    )}
                  </dd>
                </div>
                {a.provenance.publisher && (
                  <div>
                    <dt>Publisher</dt>
                    <dd>{a.provenance.publisher}</dd>
                  </div>
                )}
                {a.provenance.year && (
                  <div>
                    <dt>Year</dt>
                    <dd>{a.provenance.year}</dd>
                  </div>
                )}
                {a.provenance.notes && (
                  <div>
                    <dt>Notes</dt>
                    <dd>{a.provenance.notes}</dd>
                  </div>
                )}
              </dl>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
