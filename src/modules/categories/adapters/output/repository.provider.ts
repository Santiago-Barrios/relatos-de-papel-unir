import { EnvironmentEnum, providerFactory } from '@common/utils/provider-factory';
import type { CategoryOutputRepositoryInterface } from '../../domain/ports/category.output-repository.interface';
import { CategoryHttpRepository } from './category-http.repository';
import { CategoryRepositoryMock } from './category.repository.mock';

export const categoryRepository: CategoryOutputRepositoryInterface =
  providerFactory({
    [EnvironmentEnum.Mocked]: new CategoryRepositoryMock(),
    [EnvironmentEnum.Local]: new CategoryHttpRepository(),
    [EnvironmentEnum.Development]: new CategoryHttpRepository(),
    [EnvironmentEnum.Production]: new CategoryHttpRepository(),
  });
