import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { MyService, Tier } from '../../constant';
import { UserEntity } from './user.entity';
import { ServiceEntity } from './service.entity';

@Entity({ name: 'user_services' })
export class UserServiceEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  serviceId: MyService;

  @Column()
  tier: Tier;

  @Column()
  count: number;

  @ManyToOne(() => UserEntity, (user) => user.services)
  user: UserEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.users)
  service: ServiceEntity;
}
