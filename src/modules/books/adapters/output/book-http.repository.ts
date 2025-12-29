import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { BookOutputRepositoryInterface } from '../../domain/ports/book.output-repository.interface';
import { BookModel } from '../../domain/book.model';

export class BookHttpRepository
  extends BaseHttpRepository<BookModel>
  implements BookOutputRepositoryInterface
{
  async getBooks(): Promise<BookModel[]> {
    const data = await this.get<BookModel[]>('/books');
    return data.map((book: any) => BookModel.create(book));
  }

  async getBookById(id: number): Promise<BookModel> {
    const data = await this.get<BookModel>(`/books/${id}`);
    return BookModel.create(data);
  }

  async searchBooks(searchTerm: string): Promise<BookModel[]> {
    const data = await this.get<BookModel[]>(
      `/books/search?q=${encodeURIComponent(searchTerm)}`
    );
    return data.map((book: any) => BookModel.create(book));
  }
}
