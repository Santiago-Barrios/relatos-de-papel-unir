import type { BookOutputRepositoryInterface } from '../domain/ports/book.output-repository.interface';
import type { BookSearchResponse } from '../domain/aggregation.model';
import type { SearchFilters } from '../domain/search-filters.model';
import { BookModel } from '../domain/book.model';

export class BookService {
  private readonly repository: BookOutputRepositoryInterface;

  constructor(repository: BookOutputRepositoryInterface) {
    this.repository = repository;
  }

  async getBooks(): Promise<BookModel[]> {
    return await this.repository.getBooks();
  }

  async getBookById(id: number): Promise<BookModel> {
    return await this.repository.getBookById(id);
  }

  async searchBooks(filters: SearchFilters): Promise<BookSearchResponse> {
    return await this.repository.searchBooks(filters);
  }

  async getSuggestions(query: string): Promise<string[]> {
    return await this.repository.getSuggestions(query);
  }
}
