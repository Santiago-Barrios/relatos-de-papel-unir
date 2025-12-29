import type { BookOutputRepositoryInterface } from '../domain/ports/book.output-repository.interface';
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

  async searchBooks(searchTerm: string): Promise<BookModel[]> {
    return await this.repository.searchBooks(searchTerm);
  }
}
