import type { BookOutputRepositoryInterface } from '../../domain/ports/book.output-repository.interface';
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

  async searchBooks(searchTerm: string): Promise<BookModel[]> {
    const searchLower = searchTerm.toLowerCase();
    return this.books.filter(
      book =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower)
    );
  }
}
