import { useState } from 'react';
import { travelFormSchema } from './travelFormSchema';
import { TravelFormInput } from './travelFormTypes';

interface Props {
  onSubmit: (data: TravelFormInput) => void;
}

export function TravelDecisionForm({ onSubmit }: Props) {
  const [rawForm, setRawForm] = useState({
    distanceKm: '20',
    passengers: '1',
    selectedMode: 'petrol_car',
    region: 'india',
    priority: 'balanced',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof TravelFormInput, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedData = {
      ...rawForm,
      distanceKm: rawForm.distanceKm ? Number(rawForm.distanceKm) : undefined,
      passengers: rawForm.passengers ? Number(rawForm.passengers) : undefined,
    };

    const result = travelFormSchema.safeParse(parsedData);

    if (!result.success) {
      const formattedErrors: Partial<Record<keyof TravelFormInput, string>> =
        {};
      result.error.errors.forEach((err) => {
        const pathKey = err.path[0] as keyof TravelFormInput | undefined;
        if (pathKey) {
          formattedErrors[pathKey] = err.message;
        }
      });
      setErrors(formattedErrors);
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

      <button type="submit" className="btn-primary">
        Evaluate Alternatives
      </button>
    </form>
  );
}
