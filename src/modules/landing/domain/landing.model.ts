export class LandingModel {
  public id: number = 0;
  public title: string = '';
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  private constructor(init: Partial<LandingModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<LandingModel> = {}): LandingModel {
    return new LandingModel(init);
  }
}
