export type TAdvisorCard = {
  name: string;
  contact: { email: string };
  appearance: { about: string; avatar: string; color: string };
  presence: { isOnline: boolean };
  features: { languages: string[] };
  feedback: { reviews: number };
};
