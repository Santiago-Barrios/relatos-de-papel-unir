import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { CartOutputRepositoryInterface } from '../../domain/ports/cart.output-repository.interface';
import { CartModel } from '../../domain/cart.model';

export class CartHttpRepository
  extends BaseHttpRepository<CartModel>
  implements CartOutputRepositoryInterface
{
  async saveCart(cart: CartModel): Promise<CartModel> {
    const data = await this.post<CartModel>('/cart', cart);
    return CartModel.create(data);
  }

  async getCart(): Promise<CartModel> {
    const data = await this.get<CartModel>('/cart');
    return CartModel.create(data);
  }
}
