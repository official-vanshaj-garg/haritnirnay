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
    <div>
      <div>
        <h2>Travel Advisor</h2>
        <p>Evaluate alternatives before you book your trip.</p>
      </div>

      <div className="travel-layout">
        <aside>
          <TravelDecisionForm onSubmit={handleEvaluate} />
        </aside>

        <section aria-live="polite" aria-label="Travel recommendation results">
          {result ? (
            <TravelResults result={result} />
          ) : (
            <div>
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
