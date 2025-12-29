import {
  providerFactory,
  EnvironmentEnum,
} from '@common/utils/provider-factory';
import type { LandingOutputRepositoryInterface } from '../../domain/ports/landing.output-repository.interface';
import { LandingRepositoryMock } from './landing.repository.mock';
import { LandingHttpRepository } from './landing-http.repository';

export const landingRepository: LandingOutputRepositoryInterface =
  providerFactory({
    [EnvironmentEnum.Mocked]: new LandingRepositoryMock(),
    [EnvironmentEnum.Local]: new LandingHttpRepository(),
    [EnvironmentEnum.Development]: new LandingHttpRepository(),
    [EnvironmentEnum.Production]: new LandingHttpRepository(),
  });
