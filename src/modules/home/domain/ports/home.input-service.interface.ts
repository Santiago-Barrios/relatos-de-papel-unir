import { HomeModel } from '../home.model';

export interface HomeInputServiceInterface {
  getHome(): Promise<HomeModel>;
}
