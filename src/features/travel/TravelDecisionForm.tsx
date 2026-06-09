import { useMemo, useState } from 'react';
import { AdvisorPreview } from './AdvisorPreview';
import { TravelFormInput } from './travelFormTypes';
import {
  buildGhostAlternativePreview,
  buildTravelCtaLabel,
  DEFAULT_TRAVEL_FORM_DRAFT,
  parseTravelFormDraft,
  TravelFormDraft,
} from './travelAdvisorViewModel';

interface Props {
  onSubmit: (data: TravelFormInput) => void;
}

export function TravelDecisionForm({ onSubmit }: Props) {
  const [rawForm, setRawForm] = useState<TravelFormDraft>(
    DEFAULT_TRAVEL_FORM_DRAFT
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof TravelFormInput, string>>
  >({});

  const parsedDraft = useMemo(() => parseTravelFormDraft(rawForm), [rawForm]);
  const advisorPreview = parsedDraft.success
    ? buildGhostAlternativePreview(parsedDraft.data)
    : null;
  const ctaLabel = buildTravelCtaLabel(rawForm.selectedMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = parseTravelFormDraft(rawForm);

    if (!result.success) {
      setErrors(result.fieldErrors);
    } else {
      setErrors({});
      onSubmit(result.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="travel-form">
      <h3>Your Upcoming Decision</h3>

      <div className="form-group">
        <label htmlFor="distanceKm">Distance (km)</label>
        <input
          id="distanceKm"
          type="number"
          min="1"
          max="5000"
          step="0.1"
          value={rawForm.distanceKm}
          onChange={(e) =>
            setRawForm({ ...rawForm, distanceKm: e.target.value })
          }
        />
        {errors.distanceKm && (
          <span className="error-text" role="alert">
            {errors.distanceKm}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="passengers">Passengers</label>
        <input
          id="passengers"
          type="number"
          min="1"
          max="50"
          step="1"
          value={rawForm.passengers}
          onChange={(e) =>
            setRawForm({ ...rawForm, passengers: e.target.value })
          }
        />
        {errors.passengers && (
          <span className="error-text" role="alert">
            {errors.passengers}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="selectedMode">Current Mode Choice</label>
        <select
          id="selectedMode"
          value={rawForm.selectedMode}
          onChange={(e) =>
            setRawForm({ ...rawForm, selectedMode: e.target.value })
          }
        >
          <option value="petrol_car">Petrol Car</option>
          <option value="bus">Local Bus</option>
          <option value="train">Train</option>
          <option value="short_flight">Short Flight</option>
        </select>
        {errors.selectedMode && (
          <span className="error-text" role="alert">
            {errors.selectedMode}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Your Priority</label>
        <select
          id="priority"
          value={rawForm.priority}
          onChange={(e) => setRawForm({ ...rawForm, priority: e.target.value })}
        >
          <option value="balanced">Balanced</option>
          <option value="carbon">Lowest Carbon</option>
          <option value="time_sensitive">Time Sensitive</option>
        </select>
      </div>

      <AdvisorPreview preview={advisorPreview} />

      <button type="submit" className="btn-primary">
        {ctaLabel}
      </button>
    </form>
  );
}
