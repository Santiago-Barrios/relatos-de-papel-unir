import {
  providerFactory,
  EnvironmentEnum,
} from '@common/utils/provider-factory';
import type { CartOutputRepositoryInterface } from '../../domain/ports/cart.output-repository.interface';
import { CartRepositoryMock } from './cart.repository.mock';
import { CartHttpRepository } from './cart-http.repository';

export const cartRepository: CartOutputRepositoryInterface = providerFactory({
  [EnvironmentEnum.Mocked]: new CartRepositoryMock(),
  [EnvironmentEnum.Local]: new CartHttpRepository(),
  [EnvironmentEnum.Development]: new CartHttpRepository(),
  [EnvironmentEnum.Production]: new CartHttpRepository(),
});
