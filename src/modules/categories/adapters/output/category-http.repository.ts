import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { CategoryOutputRepositoryInterface } from '../../domain/ports/category.output-repository.interface';
import { CategoryModel } from '../../domain/category.model';

export class CategoryHttpRepository
  extends BaseHttpRepository<CategoryModel>
  implements CategoryOutputRepositoryInterface
{
  async getCategories(): Promise<CategoryModel[]> {
    const data = await this.get<CategoryModel[]>('/categories');
    return data.map((category: any) => CategoryModel.create(category));
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    const data = await this.get<CategoryModel>(`/categories/${id}`);
    return CategoryModel.create(data);
  }

  async getCategoryBySlug(slug: string): Promise<CategoryModel> {
    const data = await this.get<CategoryModel>(`/categories/slug/${slug}`);
    return CategoryModel.create(data);
  }
}
