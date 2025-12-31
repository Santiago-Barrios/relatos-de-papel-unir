import type { LandingOutputRepositoryInterface } from '../../domain/ports/landing.output-repository.interface';
import { LandingRepositoryMock } from './landing.repository.mock';

export const landingRepository: LandingOutputRepositoryInterface =
  new LandingRepositoryMock();

// export const landingRepository: LandingOutputRepositoryInterface =
//   providerFactory({
//     [EnvironmentEnum.Mocked]: new LandingRepositoryMock(),
//     [EnvironmentEnum.Local]: new LandingHttpRepository(),
//     [EnvironmentEnum.Development]: new LandingHttpRepository(),
//     [EnvironmentEnum.Production]: new LandingHttpRepository(),
//   });
