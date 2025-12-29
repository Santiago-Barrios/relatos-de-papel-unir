import type { LandingOutputRepositoryInterface } from '../domain/ports/landing.output-repository.interface';
import { LandingModel } from '../domain/landing.model';

export class LandingService {
  private readonly repository: LandingOutputRepositoryInterface;

  constructor(repository: LandingOutputRepositoryInterface) {
    this.repository = repository;
  }

  async getLanding(): Promise<LandingModel> {
    return await this.repository.getLanding();
  }
}
