import { HomeModel } from '../home.model';

export interface HomeOutputRepositoryInterface {
  getHome(): Promise<HomeModel>;
}
