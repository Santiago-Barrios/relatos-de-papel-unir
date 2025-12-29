import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { CheckoutOutputRepositoryInterface } from '../../domain/ports/checkout.output-repository.interface';
import { CheckoutModel } from '../../domain/checkout.model';

export class CheckoutHttpRepository
  extends BaseHttpRepository<CheckoutModel>
  implements CheckoutOutputRepositoryInterface
{
  async processCheckout(): Promise<CheckoutModel> {
    const data = await this.post<CheckoutModel>('/checkout');
    return CheckoutModel.create(data);
  }
}
