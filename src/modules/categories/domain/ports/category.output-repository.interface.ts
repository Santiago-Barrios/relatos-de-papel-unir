import { CategoryModel } from '../category.model';

export interface CategoryOutputRepositoryInterface {
  getCategories(): Promise<CategoryModel[]>;
  getCategoryById(id: number): Promise<CategoryModel>;
  getCategoryBySlug(slug: string): Promise<CategoryModel>;
}
