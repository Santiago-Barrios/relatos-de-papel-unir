import type { CartOutputRepositoryInterface } from '../domain/ports/cart.output-repository.interface';
import { CartModel } from '../domain/cart.model';

export class CartService {
  private readonly repository: CartOutputRepositoryInterface;

  constructor(repository: CartOutputRepositoryInterface) {
    this.repository = repository;
  }

  async saveCart(cart: CartModel): Promise<CartModel> {
    return await this.repository.saveCart(cart);
  }

  async getCart(): Promise<CartModel> {
    return await this.repository.getCart();
  }
}
