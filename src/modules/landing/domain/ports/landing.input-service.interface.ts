import { LandingModel } from '../landing.model';

export interface LandingInputServiceInterface {
  getLanding(): Promise<LandingModel>;
}
