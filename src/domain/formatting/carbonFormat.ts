const APPROXIMATE_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 2,
});

export function formatApproxNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return 'not available';
  }

  const normalizedValue = Object.is(value, -0) ? 0 : value;
  return APPROXIMATE_NUMBER_FORMATTER.format(normalizedValue);
}

export function formatApproxKgCO2e(value: number): string {
  return `about ${formatApproxNumber(value)} kg CO2e`;
}

export function formatApproxUnitValue(value: number, unit: string): string {
  return `about ${formatApproxNumber(value)} ${unit}`;
}
