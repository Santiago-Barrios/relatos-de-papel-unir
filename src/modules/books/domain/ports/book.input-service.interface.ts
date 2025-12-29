import { BookModel } from '../book.model';

export interface BookInputServiceInterface {
  getBooks(): Promise<BookModel[]>;
  getBookById(id: number): Promise<BookModel>;
  searchBooks(searchTerm: string): Promise<BookModel[]>;
}
