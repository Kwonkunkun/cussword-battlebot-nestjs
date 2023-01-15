import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MyService } from '../../constant';
import { UserServiceEntity } from './user-service.entity';

@Entity('services')
export class ServiceEntity {
  @PrimaryColumn()
  id: MyService;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserServiceEntity, (userService) => userService.service)
  users: UserServiceEntity[];
}
