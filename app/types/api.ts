export interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string | null;
    officialSite: string;
    schedule: {
      time: string;
      days: string[];
    };
    rating: {
      average: number | null;
    };
    network: {
      id: number;
      name: string;
      country: {
        name: string;
        code: string;
        timezone: string;
      };
    };
    image: {
      medium: string;
      original: string;
    } | null;
    summary: string;
  }
  
  export interface ShowSearchResult {
    score: number;
    show: Show;
  }
  