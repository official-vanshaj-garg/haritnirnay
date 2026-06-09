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

      <p className="receipt-disclaimer">{receipt.disclaimer}</p>
    </article>
  );
}
