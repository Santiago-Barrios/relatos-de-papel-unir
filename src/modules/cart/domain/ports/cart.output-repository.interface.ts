import { CartModel } from '../cart.model';

export interface CartOutputRepositoryInterface {
  saveCart(cart: CartModel): Promise<CartModel>;
  getCart(): Promise<CartModel>;
}
