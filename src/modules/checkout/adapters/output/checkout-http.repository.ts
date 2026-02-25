import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { CheckoutOutputRepositoryInterface } from '../../domain/ports/checkout.output-repository.interface';
import type { PurchaseItem } from '../../domain/ports/checkout.input-service.interface';
import { CheckoutModel } from '../../domain/checkout.model';

interface PurchaseResponseDto {
  id: number;
  purchaseDate: string;
}

export class CheckoutHttpRepository
  extends BaseHttpRepository<CheckoutModel>
  implements CheckoutOutputRepositoryInterface
{
  async processCheckout(items: PurchaseItem[]): Promise<CheckoutModel> {
    const data = await this.post<PurchaseResponseDto>(
      '/payments/api/v1/purchases',
      { items }
    );
    return CheckoutModel.create({
      id: data.id,
      title: 'Pedido confirmado',
      createdAt: data.purchaseDate ? new Date(data.purchaseDate) : new Date(),
      updatedAt: new Date(),
    });
  }
}
