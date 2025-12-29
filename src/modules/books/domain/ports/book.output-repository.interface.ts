import { BookModel } from '../book.model';

export interface BookOutputRepositoryInterface {
  getBooks(): Promise<BookModel[]>;
  getBookById(id: number): Promise<BookModel>;
  searchBooks(searchTerm: string): Promise<BookModel[]>;
}
