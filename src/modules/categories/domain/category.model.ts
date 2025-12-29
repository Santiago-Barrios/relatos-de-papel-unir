export class CategoryModel {
  public id: number = 0;
  public name: string = '';
  public description: string = '';
  public slug: string = '';
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  private constructor(init: Partial<CategoryModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<CategoryModel> = {}): CategoryModel {
    return new CategoryModel(init);
  }
}
