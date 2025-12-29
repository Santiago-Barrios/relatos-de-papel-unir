import {
  providerFactory,
  EnvironmentEnum,
} from '@common/utils/provider-factory';
import type { CategoryOutputRepositoryInterface } from '../../domain/ports/category.output-repository.interface';
import { CategoryRepositoryMock } from './category.repository.mock';
import { CategoryHttpRepository } from './category-http.repository';

export const categoryRepository: CategoryOutputRepositoryInterface =
  providerFactory({
    [EnvironmentEnum.Mocked]: new CategoryRepositoryMock(),
    [EnvironmentEnum.Local]: new CategoryHttpRepository(),
    [EnvironmentEnum.Production]: new CategoryHttpRepository(),
  });
