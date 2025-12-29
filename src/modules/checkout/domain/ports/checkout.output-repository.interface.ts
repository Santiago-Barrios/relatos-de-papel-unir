import { CheckoutModel } from '../checkout.model';

export interface CheckoutOutputRepositoryInterface {
  processCheckout(): Promise<CheckoutModel>;
}
