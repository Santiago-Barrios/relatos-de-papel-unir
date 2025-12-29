import {
  providerFactory,
  EnvironmentEnum,
} from '@common/utils/provider-factory';
import type { HomeOutputRepositoryInterface } from '../../domain/ports/home.output-repository.interface';
import { HomeRepositoryMock } from './home.repository.mock';
import { HomeHttpRepository } from './home-http.repository';

export const homeRepository: HomeOutputRepositoryInterface = providerFactory({
  [EnvironmentEnum.Mocked]: new HomeRepositoryMock(),
  [EnvironmentEnum.Local]: new HomeHttpRepository(),
  [EnvironmentEnum.Development]: new HomeHttpRepository(),
  [EnvironmentEnum.Production]: new HomeHttpRepository(),
});
