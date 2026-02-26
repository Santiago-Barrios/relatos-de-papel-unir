import type { BookOutputRepositoryInterface } from '../../domain/ports/book.output-repository.interface';
import type { BookSearchResponse } from '../../domain/aggregation.model';
import type { SearchFilters } from '../../domain/search-filters.model';
import { BookModel } from '../../domain/book.model';
import { bookRepositoryMockData } from './book-data.repository.mock';

export class BookRepositoryMock implements BookOutputRepositoryInterface {
  private books: BookModel[] = bookRepositoryMockData;

  async getBooks(): Promise<BookModel[]> {
    return [...this.books];
  }

  async getBookById(id: number): Promise<BookModel> {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async searchBooks(filters: SearchFilters): Promise<BookSearchResponse> {
    let filtered = [...this.books];

    if (filters.q) {
      const searchLower = filters.q.toLowerCase();
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.authorName.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        book => book.categories?.some(c => c.toLowerCase().includes(filters.category!.toLowerCase()))
      );
    }

    const aggregations: Record<string, { key: string; count: number }[]> = {};
    if (filters.aggregate !== false) {
      const categoryCounts = new Map<string, number>();
      filtered.forEach(book =>
        book.categories?.forEach(cat => {
          categoryCounts.set(cat, (categoryCounts.get(cat) ?? 0) + 1);
        })
      );
      aggregations.category = Array.from(categoryCounts.entries()).map(([key, count]) => ({ key, count }));
    }

    const totalElements = filtered.length;
    const page = Math.max(0, filters.page ?? 0);
    const size = Math.max(1, filters.size ?? 20);
    const start = page * size;
    const paginatedBooks = filtered.slice(start, start + size);
    const totalPages = Math.ceil(totalElements / size) || 0;

    return {
      books: paginatedBooks,
      aggregations,
      totalElements,
      totalPages,
    };
  }

  async getSuggestions(query: string): Promise<string[]> {
    if (!query.trim()) return [];
    const searchLower = query.toLowerCase();
    const suggestions = new Set<string>();
    this.books.forEach(book => {
      if (book.title.toLowerCase().includes(searchLower)) suggestions.add(book.title);
      if (book.authorName.toLowerCase().includes(searchLower)) suggestions.add(book.authorName);
    });
    return Array.from(suggestions).slice(0, 10);
  }
}
