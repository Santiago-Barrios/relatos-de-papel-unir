import type { CheckoutOutputRepositoryInterface } from '../../domain/ports/checkout.output-repository.interface';
import { CheckoutModel } from '../../domain/checkout.model';

export class CheckoutRepositoryMock implements CheckoutOutputRepositoryInterface {
  async processCheckout(): Promise<CheckoutModel> {
    // Simular un proceso de checkout exitoso
    return CheckoutModel.create({
      id: Math.floor(Math.random() * 10000) + 1,
      title: 'Pedido procesado exitosamente',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
