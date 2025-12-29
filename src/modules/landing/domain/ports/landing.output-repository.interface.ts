import { LandingModel } from '../landing.model';

export interface LandingOutputRepositoryInterface {
  getLanding(): Promise<LandingModel>;
}
