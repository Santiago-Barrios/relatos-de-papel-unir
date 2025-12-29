export class HomeModel {
  public id: number = 0;
  public title: string = '';
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  private constructor(init: Partial<HomeModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<HomeModel> = {}): HomeModel {
    return new HomeModel(init);
  }
}
