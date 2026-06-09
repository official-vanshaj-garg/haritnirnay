import { CarbonReceiptViewModel } from './travelAdvisorViewModel';

interface Props {
  receipt: CarbonReceiptViewModel;
}

export function CarbonReceipt({ receipt }: Props) {
  return (
    <article className="carbon-receipt fade-in" aria-label="Carbon receipt">
      <header className="carbon-receipt-header">
        <p className="receipt-kicker">Carbon receipt</p>
        <h2>Recommended choice</h2>
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
          <div className="carbon-cut-node carbon-cut-saving">
            <dt>{receipt.carbonCut.cutLabel}</dt>
            <dd>{receipt.carbonCut.cutValue}</dd>
          </div>
        </dl>
        <p className="carbon-cut-trust">{receipt.carbonCut.trustNote}</p>
      </section>

      <p className="receipt-disclaimer">{receipt.disclaimer}</p>
    </article>
  );
}
