import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { HomeOutputRepositoryInterface } from '../../domain/ports/home.output-repository.interface';
import { HomeModel } from '../../domain/home.model';

export class HomeHttpRepository
  extends BaseHttpRepository<HomeModel>
  implements HomeOutputRepositoryInterface
{
  async getHome(): Promise<HomeModel> {
    const data = await this.get<HomeModel>('/home');

    return HomeModel.create({
      id: data.id || 1,
      title: data.title || 'Relatos de Papel',
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
    });
  }
}
