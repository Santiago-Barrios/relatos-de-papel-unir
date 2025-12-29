export class BookModel {
  public id: number = 0;
  public title: string = '';
  public author: string = '';
  public code: string = '';
  public price: number = 0;
  public image?: string = undefined;
  public description: string = '';
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  private constructor(init: Partial<BookModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<BookModel> = {}): BookModel {
    return new BookModel(init);
  }
}
