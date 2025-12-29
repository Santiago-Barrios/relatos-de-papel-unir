import { BookModel } from '@modules/books';

export class CartItemModel {
  public book!: BookModel;
  public quantity: number = 1;

  private constructor(init: Partial<CartItemModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<CartItemModel>): CartItemModel {
    return new CartItemModel(init);
  }
}

export class CartModel {
  public items: CartItemModel[] = [];
  public total: number = 0;

  private constructor(init: Partial<CartModel> = {}) {
    Object.assign(this, init);
  }

  static create(init: Partial<CartModel> = {}): CartModel {
    return new CartModel(init);
  }
}
