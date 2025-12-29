import type { LandingOutputRepositoryInterface } from '../../domain/ports/landing.output-repository.interface';
import { LandingModel } from '../../domain/landing.model';

export class LandingRepositoryMock implements LandingOutputRepositoryInterface {
  async getLanding(): Promise<LandingModel> {
    return LandingModel.create({
      id: 1,
      title: 'Relatos de Papel - Tu librería online',
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-15T10:00:00Z'),
    });
  }
}
