export class CheckoutModel {
  public id: number = 0;
  public title: string = '';
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  private constructor(init: Partial<CheckoutModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<CheckoutModel> = {}): CheckoutModel {
    return new CheckoutModel(init);
  }
}
