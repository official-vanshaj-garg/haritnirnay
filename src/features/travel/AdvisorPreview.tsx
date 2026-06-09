import { GhostAlternativePreview } from './travelAdvisorViewModel';

interface Props {
  preview: GhostAlternativePreview | null;
}

export function AdvisorPreview({ preview }: Props) {
  if (!preview) return null;

  return (
    <div
      className={`advisor-preview advisor-preview-${preview.kind}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="advisor-preview-label">Advisor preview</p>
      <p>{preview.text}</p>
    </div>
  );
}
