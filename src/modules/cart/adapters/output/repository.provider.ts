import type { CartOutputRepositoryInterface } from '../../domain/ports/cart.output-repository.interface';
import { CartRepositoryMock } from './cart.repository.mock';

export const cartRepository: CartOutputRepositoryInterface =
  new CartRepositoryMock();

// export const cartRepository: CartOutputRepositoryInterface = providerFactory({
//   [EnvironmentEnum.Mocked]: new CartRepositoryMock(),
//   [EnvironmentEnum.Local]: new CartHttpRepository(),
//   [EnvironmentEnum.Development]: new CartHttpRepository(),
//   [EnvironmentEnum.Production]: new CartHttpRepository(),
// });
