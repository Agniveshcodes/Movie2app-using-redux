export type Show = {
  id: number;
  image?: {
    medium: string;
    original: string;
  };
  name: string;
  type: string;
  language: string;
  genres: string[];
  rating: {
    average: number;
  };
  summary: string;
};
