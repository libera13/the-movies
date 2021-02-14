export interface MovieSearchFilters {
  includeAdult: boolean;
  title: string;
  query: string;
  year: Integer | null;
}
