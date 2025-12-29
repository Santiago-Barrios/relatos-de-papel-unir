import type { CategoryOutputRepositoryInterface } from '../../domain/ports/category.output-repository.interface';
import { CategoryModel } from '../../domain/category.model';
import { categoryRepositoryMockData } from './category-data.repository.mock';

export class CategoryRepositoryMock implements CategoryOutputRepositoryInterface {
  private categories: CategoryModel[] = categoryRepositoryMockData;

  async getCategories(): Promise<CategoryModel[]> {
    return [...this.categories];
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    const category = this.categories.find(c => c.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<CategoryModel> {
    const category = this.categories.find(c => c.slug === slug);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
}
