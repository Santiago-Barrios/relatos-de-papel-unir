import { BaseHttpRepository } from '@common/adapters/output/http/base-http-repository';
import type { LandingOutputRepositoryInterface } from '../../domain/ports/landing.output-repository.interface';
import { LandingModel } from '../../domain/landing.model';

export class LandingHttpRepository
  extends BaseHttpRepository<LandingModel>
  implements LandingOutputRepositoryInterface
{
  async getLanding(): Promise<LandingModel> {
    const data = await this.get<LandingModel>('/landing');
    return LandingModel.create(data);
  }
}
