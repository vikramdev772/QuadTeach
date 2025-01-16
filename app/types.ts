// types.ts
export interface Show {
    id: number;
    name: string;
    summary: string;
    image?: {
      medium?: string;
      original?: string;
    };
    rating?: {
      average?: number;
    };
    genres?: string[];
    schedule?: {
      days: string[];
      time: string;
    };
  }
  
  export interface ShowSearchResult {
    show: Show;
    score: number;
  }
  
  // No default export needed for type definitions