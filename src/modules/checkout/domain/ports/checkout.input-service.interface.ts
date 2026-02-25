import { CheckoutModel } from '../checkout.model';

export interface PurchaseItem {
  bookId: number;
  quantity: number;
}

export interface CheckoutInputServiceInterface {
  processCheckout(items: PurchaseItem[]): Promise<CheckoutModel>;
}
