import type { CategoryOutputRepositoryInterface } from '../domain/ports/category.output-repository.interface';
import { CategoryModel } from '../domain/category.model';

export class CategoryService {
  private readonly repository: CategoryOutputRepositoryInterface;

  constructor(repository: CategoryOutputRepositoryInterface) {
    this.repository = repository;
  }

  async getCategories(): Promise<CategoryModel[]> {
    return await this.repository.getCategories();
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    return await this.repository.getCategoryById(id);
  }

  async getCategoryBySlug(slug: string): Promise<CategoryModel> {
    return await this.repository.getCategoryBySlug(slug);
  }
}
