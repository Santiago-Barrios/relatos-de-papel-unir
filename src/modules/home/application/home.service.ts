import type { HomeOutputRepositoryInterface } from '../domain/ports/home.output-repository.interface';
import { HomeModel } from '../domain/home.model';

export class HomeService {
  private readonly repository: HomeOutputRepositoryInterface;

  constructor(repository: HomeOutputRepositoryInterface) {
    this.repository = repository;
  }

  async getHome(): Promise<HomeModel> {
    return await this.repository.getHome();
  }
}
