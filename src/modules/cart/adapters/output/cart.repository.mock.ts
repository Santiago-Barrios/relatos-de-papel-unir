import type { CartOutputRepositoryInterface } from '../../domain/ports/cart.output-repository.interface';
import { CartModel } from '../../domain/cart.model';
import { cartRepositoryMockData } from './cart-data.repository.mock';

export class CartRepositoryMock implements CartOutputRepositoryInterface {
  private cart: CartModel = cartRepositoryMockData;

  async saveCart(cart: CartModel): Promise<CartModel> {
    // Calcular el total basado en los items
    const total = cart.items.reduce(
      (sum, item) => sum + item.book.price * item.quantity,
      0
    );

    this.cart = CartModel.create({
      ...cart,
      total,
    });

    return this.cart;
  }

  async getCart(): Promise<CartModel> {
    return CartModel.create({
      ...this.cart,
    });
  }
}
