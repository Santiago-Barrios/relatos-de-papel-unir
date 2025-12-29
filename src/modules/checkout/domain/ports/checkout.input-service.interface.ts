import { CheckoutModel } from '../checkout.model';

export interface CheckoutInputServiceInterface {
  processCheckout(): Promise<CheckoutModel>;
}
