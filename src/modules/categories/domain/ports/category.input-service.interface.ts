import { CategoryModel } from '../category.model';

export interface CategoryInputServiceInterface {
  getCategories(): Promise<CategoryModel[]>;
  getCategoryById(id: number): Promise<CategoryModel>;
  getCategoryBySlug(slug: string): Promise<CategoryModel>;
}
