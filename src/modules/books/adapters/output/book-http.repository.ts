import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { BookOutputRepositoryInterface } from '../../domain/ports/book.output-repository.interface';
import type { BookSearchResponse } from '../../domain/aggregation.model';
import type { SearchFilters } from '../../domain/search-filters.model';
import { BookModel } from '../../domain/book.model';

interface BookBackendDto {
  id: number;
  title: string;
  author: string;
  publicationDate?: string;
  category?: string;
  isbn?: number;
  valoration?: number;
  isVisible?: boolean;
  currentStock?: number;
  price?: number;
  imageUrl?: string;
  description?: string;
  editorial?: string;
  language?: string;
  pages?: number;
  edition?: number;
  biography?: string;
  authorPhotoUrl?: string;
}

function mapToBookModel(dto: BookBackendDto): BookModel {
  return BookModel.create({
    id: dto.id,
    title: dto.title,
    author: dto.author,
    authorName: dto.author,
    code: dto.isbn ? String(dto.isbn) : '',
    categories: dto.category ? [dto.category] : [],
    availability: dto.currentStock ?? 0,
    year: dto.publicationDate
      ? new Date(dto.publicationDate).getFullYear()
      : 0,
    price: dto.price ?? 0,
    image: dto.imageUrl,
    description: dto.description ?? '',
    editorial: dto.editorial ?? '',
    language: dto.language ?? '',
    pages: dto.pages ?? 0,
    edition: dto.edition ?? 1,
    biography: dto.biography ?? '',
    authorPhoto: dto.authorPhotoUrl,
  });
}

export class BookHttpRepository
  extends BaseHttpRepository<BookModel>
  implements BookOutputRepositoryInterface
{
  async getBooks(): Promise<BookModel[]> {
    const data = await this.get<BookBackendDto[]>('/search/api/v1/books');
    return data.map(mapToBookModel);
  }

  async getBookById(id: number): Promise<BookModel> {
    const data = await this.get<BookBackendDto>(`/search/api/v1/books/${id}`);
    return mapToBookModel(data);
  }

  async searchBooks(filters: SearchFilters): Promise<BookSearchResponse> {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.title) params.set('title', filters.title);
    if (filters.author) params.set('author', filters.author);
    if (filters.category) params.set('category', filters.category);
    if (filters.priceMin != null) params.set('priceMin', String(filters.priceMin));
    if (filters.priceMax != null) params.set('priceMax', String(filters.priceMax));
    params.set('isVisible', String(filters.isVisible ?? true));
    params.set('aggregate', String(filters.aggregate ?? true));

    const queryString = params.toString();
    const data = await this.get<{
      books: BookBackendDto[];
      aggregations: Record<string, { key: string; count: number; uri?: string }[]>;
    }>(`/search/api/v1/books/search${queryString ? `?${queryString}` : ''}`);

    return {
      books: data.books.map(mapToBookModel),
      aggregations: data.aggregations ?? {},
    };
  }
}
