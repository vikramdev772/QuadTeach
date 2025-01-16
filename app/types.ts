export interface Show {
  id: number;
  name: string;
  summary: string;
  image?: {
    medium: string;
    original: string;
  };
  rating?: {
    average: number;
  };
  genres?: string[];
  schedule?: {
    time: string;
    days: string[];
  };
  network?: {
    name: string;
  };
}

export interface ShowSearchResult {
  show: Show;
  score: number;
}
