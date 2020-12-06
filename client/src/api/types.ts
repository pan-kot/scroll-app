// Ideally to generate these from the API

export type TAdvisorCard = {
  id: string;
  name: string;
  contact: { email: string };
  appearance: { about: string; color: string };
  presence: { isOnline: boolean };
  features: { languages: string[] };
  feedback: { reviews: number };
};

export type TAdvisorsRequest = {
  page: number;
  sortByReviews: TSortByReviews | null;
  isOnline: boolean | null;
  language: string | null;
};

export type TSortByReviews = 'asc' | 'desc';

export type TAdvisorsResponse = {
  total: number;
  items: TAdvisorCard[];
};
