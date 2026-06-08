import { useState } from 'react';
import { TravelDecisionForm } from './TravelDecisionForm';
import { TravelResults } from './TravelResults';
import {
  TravelDecisionResult,
  generateTravelViewModel,
} from './travelDecisionViewModel';
import { TravelFormInput } from './travelFormTypes';

export function TravelDecisionPage() {
  const [result, setResult] = useState<TravelDecisionResult | null>(null);

  const handleEvaluate = (input: TravelFormInput) => {
    const data = generateTravelViewModel(input);
    setResult(data);
  };

  return (
    <div className="travel-page">
      <div className="page-header">
        <h2>Travel Advisor</h2>
        <p>Evaluate alternatives before you book your trip.</p>
      </div>

      <div className="travel-layout">
        <aside className="travel-sidebar">
          <TravelDecisionForm onSubmit={handleEvaluate} />
        </aside>

        <section
          className="travel-main"
          aria-live="polite"
          aria-label="Travel recommendation results"
        >
          {result ? (
            <TravelResults result={result} />
          ) : (
            <div className="empty-state">
              <p>
                Fill out your upcoming travel plans to see ranked alternatives.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
