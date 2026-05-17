export type PopulationItem = {
  age_range: string;
  male: number;
  female: number;
};

export type DetailsFormData = {
  barangay_name: string;
  nurse_assigned: string;
  contact_number: string;
};

const INITIAL_POPULATIONS: PopulationItem[] = [
  { age_range: 'All Ages', male: 0, female: 0 },
  { age_range: 'Under 1 (0-11 months)', male: 0, female: 0 },
  { age_range: 'Under 0-12 months', male: 0, female: 0 },
  { age_range: 'Under 0-53 months', male: 0, female: 0 },
  { age_range: '10 years and above', male: 0, female: 0 },
];

export const createInitialPopulations = (): PopulationItem[] =>
  INITIAL_POPULATIONS.map((population) => ({ ...population }));

export const getCsrfToken = () =>
  typeof document !== 'undefined'
    ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    : '';

export const createJsonRequestInit = (csrfToken: string, body: unknown): RequestInit => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': csrfToken,
  },
  credentials: 'same-origin',
  body: JSON.stringify(body),
});

export const formatValidationErrors = (errors: Record<string, string[]>) =>
  Object.entries(errors || {})
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('\n');
