import type { BookModel } from '../book.model';
import type { BookSearchResponse } from '../aggregation.model';
import type { SearchFilters } from '../search-filters.model';

export interface BookInputServiceInterface {
  getBooks(): Promise<BookModel[]>;
  getBookById(id: number): Promise<BookModel>;
  searchBooks(filters: SearchFilters): Promise<BookSearchResponse>;
}
