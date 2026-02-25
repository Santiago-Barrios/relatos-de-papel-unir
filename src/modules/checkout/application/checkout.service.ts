import type { CheckoutOutputRepositoryInterface } from '../domain/ports/checkout.output-repository.interface';
import type { PurchaseItem } from '../domain/ports/checkout.input-service.interface';
import { CheckoutModel } from '../domain/checkout.model';

export class CheckoutService {
  private readonly repository: CheckoutOutputRepositoryInterface;

  constructor(repository: CheckoutOutputRepositoryInterface) {
    this.repository = repository;
  }

  async processCheckout(items: PurchaseItem[]): Promise<CheckoutModel> {
    return await this.repository.processCheckout(items);
  }
}
