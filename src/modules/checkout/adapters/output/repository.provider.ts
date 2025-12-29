import {
  providerFactory,
  EnvironmentEnum,
} from '@common/utils/provider-factory';
import type { CheckoutOutputRepositoryInterface } from '../../domain/ports/checkout.output-repository.interface';
import { CheckoutRepositoryMock } from './checkout.repository.mock';
import { CheckoutHttpRepository } from './checkout-http.repository';

export const checkoutRepository: CheckoutOutputRepositoryInterface =
  providerFactory({
    [EnvironmentEnum.Mocked]: new CheckoutRepositoryMock(),
    [EnvironmentEnum.Local]: new CheckoutHttpRepository(),
    [EnvironmentEnum.Development]: new CheckoutHttpRepository(),
    [EnvironmentEnum.Production]: new CheckoutHttpRepository(),
  });
