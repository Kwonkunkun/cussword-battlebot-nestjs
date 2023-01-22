import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../../typeorm/entities/service.entity';
import { Repository } from 'typeorm';
import { MyService } from '../../constant';
import { UserServiceEntity } from '../../typeorm/entities/user-service.entity';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger(ServiceService.name);

  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  /**
   * @description 각 서비스를 가져오는 함수, user count 를 기준으로 내림차순 정렬
   */
  async getService(serviceId: MyService): Promise<ServiceEntity> {
    return await this.serviceRepository.findOne({
      where: { id: serviceId },
      relations: ['users'],
      order: {
        users: {
          count: 'DESC',
        },
      },
    });
  }

  /**
   * @description 서비스를 추가하는 함수
   */
  async addService(serviceId: MyService, serviceName: string) {
    const service = this.serviceRepository.create({
      id: serviceId,
      name: serviceName,
    });
    await this.serviceRepository.save(service);
  }
}
