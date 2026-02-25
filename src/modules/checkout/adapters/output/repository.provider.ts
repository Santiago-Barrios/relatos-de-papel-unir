import { EnvironmentEnum, providerFactory } from '@common/utils/provider-factory';
import type { CheckoutOutputRepositoryInterface } from '../../domain/ports/checkout.output-repository.interface';
import { CheckoutHttpRepository } from './checkout-http.repository';
import { CheckoutRepositoryMock } from './checkout.repository.mock';

export const checkoutRepository: CheckoutOutputRepositoryInterface =
  providerFactory({
    [EnvironmentEnum.Mocked]: new CheckoutRepositoryMock(),
    [EnvironmentEnum.Local]: new CheckoutHttpRepository(),
    [EnvironmentEnum.Development]: new CheckoutHttpRepository(),
    [EnvironmentEnum.Production]: new CheckoutHttpRepository(),
  });
