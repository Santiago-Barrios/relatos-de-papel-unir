import type { BookModel } from './book.model';

export interface AggregationDetails {
  key: string;
  count: number;
  uri?: string;
}

export interface BookSearchResponse {
  books: BookModel[];
  aggregations: Record<string, AggregationDetails[]>;
}
