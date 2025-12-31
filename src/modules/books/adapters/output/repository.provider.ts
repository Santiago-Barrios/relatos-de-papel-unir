import type { BookOutputRepositoryInterface } from '../../domain/ports/book.output-repository.interface';
import { BookRepositoryMock } from './book.repository.mock';

// export const bookRepository: BookOutputRepositoryInterface = providerFactory({
//   [EnvironmentEnum.Mocked]: new BookRepositoryMock(),
//   [EnvironmentEnum.Local]: new BookHttpRepository(),
//   [EnvironmentEnum.Production]: new BookHttpRepository(),
// });
export const bookRepository: BookOutputRepositoryInterface =
  new BookRepositoryMock();
