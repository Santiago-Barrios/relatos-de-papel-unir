import {
  providerFactory,
  EnvironmentEnum,
} from '@common/utils/provider-factory';
import type { BookOutputRepositoryInterface } from '../../domain/ports/book.output-repository.interface';
import { BookRepositoryMock } from './book.repository.mock';
import { BookHttpRepository } from './book-http.repository';

export const bookRepository: BookOutputRepositoryInterface = providerFactory({
  [EnvironmentEnum.Mocked]: new BookRepositoryMock(),
  [EnvironmentEnum.Local]: new BookHttpRepository(),
  [EnvironmentEnum.Production]: new BookHttpRepository(),
});
