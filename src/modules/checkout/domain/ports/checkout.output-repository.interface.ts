import { CheckoutModel } from '../checkout.model';
import type { PurchaseItem } from './checkout.input-service.interface';

export interface CheckoutOutputRepositoryInterface {
  processCheckout(items: PurchaseItem[]): Promise<CheckoutModel>;
}
