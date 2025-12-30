export class ReviewModel {
  public id: number = 0;
  public user: string = '';
  public date: Date = new Date();
  public description: string = '';
  public rating: number = 0; // 1-5

  private constructor(init: Partial<ReviewModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<ReviewModel> = {}): ReviewModel {
    return new ReviewModel(init);
  }
}
