import { CarbonReceiptViewModel } from './travelAdvisorViewModel';

interface Props {
  receipt: CarbonReceiptViewModel;
}

export function CarbonReceipt({ receipt }: Props) {
  return (
    <article className="carbon-receipt fade-in" aria-label="Carbon receipt">
      <header className="carbon-receipt-header">
        <div>
          <p className="receipt-kicker">Carbon receipt</p>
          <h2>Decision Receipt</h2>
          <p className="receipt-subtitle">
            Carbon decisions, explained before you act.
          </p>
        </div>
        <ul className="receipt-trust-strip" aria-label="Receipt trust posture">
          {receipt.trustStripItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <dl className="carbon-receipt-grid">
        <div>
          <dt>Current choice</dt>
          <dd>{receipt.currentChoiceLabel}</dd>
        </div>
        <div className="receipt-highlight">
          <dt>Recommended choice</dt>
          <dd>{receipt.recommendedChoiceLabel}</dd>
        </div>
        <div>
          <dt>{receipt.todayLabel}</dt>
          <dd>{receipt.todayValue}</dd>
        </div>
        <div>
          <dt>{receipt.horizonLabel}</dt>
          <dd>{receipt.horizonValue}</dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>{receipt.confidenceLabel}</dd>
        </div>
      </dl>

      <section
        className={`carbon-cut carbon-cut-${receipt.carbonCut.status}`}
        aria-labelledby="carbon-cut-title"
      >
        <h3 id="carbon-cut-title">Carbon Cut / Decision Slice</h3>
        <p className="carbon-cut-summary">{receipt.carbonCut.summary}</p>
        <dl className="carbon-cut-strip">
          <div className="carbon-cut-node carbon-cut-current">
            <dt>{receipt.carbonCut.currentImpactLabel}</dt>
            <dd>{receipt.carbonCut.currentImpactValue}</dd>
          </div>
          <div className="carbon-cut-node carbon-cut-recommended">
            <dt>{receipt.carbonCut.recommendedImpactLabel}</dt>
            <dd>{receipt.carbonCut.recommendedImpactValue}</dd>
          </div>
          <div className="carbon-cut-node carbon-cut-today">
            <dt>{receipt.carbonCut.avoidedTodayLabel}</dt>
            <dd>{receipt.carbonCut.avoidedTodayValue}</dd>
          </div>
          <div className="carbon-cut-node carbon-cut-saving">
            <dt>{receipt.carbonCut.avoidedTenYearLabel}</dt>
            <dd>{receipt.carbonCut.avoidedTenYearValue}</dd>
          </div>
        </dl>

        <section
          className="decision-fork"
          aria-labelledby="decision-fork-title"
        >
          <h4 id="decision-fork-title">{receipt.carbonCut.fork.title}</h4>
          <p>{receipt.carbonCut.fork.note}</p>
          <ol className="decision-fork-list">
            <li className="decision-fork-path decision-fork-current">
              <p className="decision-fork-label">
                {receipt.carbonCut.fork.currentPath.pathLabel}
              </p>
              <p className="decision-fork-choice">
                {receipt.carbonCut.fork.currentPath.choiceLabel}
              </p>
              <dl>
                <div>
                  <dt>{receipt.carbonCut.fork.currentPath.impactLabel}</dt>
                  <dd>{receipt.carbonCut.fork.currentPath.impactValue}</dd>
                </div>
              </dl>
            </li>
            <li className="decision-fork-path decision-fork-recommended">
              <p className="decision-fork-label">
                {receipt.carbonCut.fork.recommendedPath.pathLabel}
              </p>
              <p className="decision-fork-choice">
                {receipt.carbonCut.fork.recommendedPath.choiceLabel}
              </p>
              <dl>
                <div>
                  <dt>{receipt.carbonCut.fork.recommendedPath.impactLabel}</dt>
                  <dd>{receipt.carbonCut.fork.recommendedPath.impactValue}</dd>
                </div>
              </dl>
            </li>
          </ol>
        </section>

        <p className="carbon-cut-trust">{receipt.carbonCut.trustNote}</p>
      </section>

      <p className="receipt-disclaimer">{receipt.disclaimer}</p>
    </article>
  );
}
