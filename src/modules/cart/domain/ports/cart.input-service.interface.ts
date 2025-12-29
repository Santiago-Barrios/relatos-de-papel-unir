import { CartModel } from '../cart.model';

export interface CartInputServiceInterface {
  saveCart(cart: CartModel): Promise<CartModel>;
  getCart(): Promise<CartModel>;
}
