import type { HomeOutputRepositoryInterface } from '../../domain/ports/home.output-repository.interface';
import { HomeModel } from '../../domain/home.model';

export class HomeRepositoryMock implements HomeOutputRepositoryInterface {
  async getHome(): Promise<HomeModel> {
    return HomeModel.create({
      id: 1,
      title: 'Bienvenido a Relatos de Papel',
      createdAt: new Date('2024-01-01T10:00:00Z'),
      updatedAt: new Date('2024-01-15T10:00:00Z'),
    });
  }
}
