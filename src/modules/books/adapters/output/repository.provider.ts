import { EnvironmentEnum, providerFactory } from '@common/utils/provider-factory';
import type { BookOutputRepositoryInterface } from '../../domain/ports/book.output-repository.interface';
import { BookHttpRepository } from './book-http.repository';
import { BookRepositoryMock } from './book.repository.mock';

export const bookRepository: BookOutputRepositoryInterface = providerFactory({
  [EnvironmentEnum.Mocked]: new BookRepositoryMock(),
  [EnvironmentEnum.Local]: new BookHttpRepository(),
  [EnvironmentEnum.Development]: new BookHttpRepository(),
  [EnvironmentEnum.Production]: new BookHttpRepository(),
});
