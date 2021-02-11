export interface MovieSearchFilters {
  includeAdult: boolean;
  title: string;
  query: string;
  year: Integer | null;
}

export interface MovieSearchResult {
  poster_path: string | null;
}
