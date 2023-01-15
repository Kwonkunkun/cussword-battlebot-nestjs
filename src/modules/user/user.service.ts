import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { UserServiceEntity } from '../../typeorm/entities/user-service.entity';
import { MyService, Tier } from '../../constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserServiceEntity)
    private readonly userServiceEntityRepository: Repository<UserServiceEntity>,
  ) {}

  /**
   * @description 해당 유저의 service count 를 증가시키는 함수
   */
  async increaseServiceCount(userId: string, serviceId: MyService) {
    const userService = await this.userServiceEntityRepository.findOneBy({
      userId,
      serviceId,
    });
    userService.count++;
    await this.userServiceEntityRepository.save(userService);
  }

  /**
   * @description 신규 유저 생성
   */
  async createNewUser(userId: string, username: string) {
    await this.createUser(userId, username);
    await this.addUserService(userId, 'cussword', 'bronze');
    await this.addUserService(userId, 'defence', 'bronze');
  }

  /**
   * @description 유저가 내 db 에 있는지 확인하는 함수
   */
  async isUser(userId: string) {
    return !!(await this.userRepository.findOneBy({ id: userId }));
  }

  /**
   * @inner
   * @description 해당 유저의 서비스를 추가하는 함수
   */
  async addUserService(userId: string, serviceId: MyService, tier: Tier) {
    const userService = this.userServiceEntityRepository.create({
      userId,
      serviceId,
      tier,
      service: { id: serviceId },
      count: 0,
    });
    await this.userServiceEntityRepository.save(userService);
  }

  /**
   * @inner
   * @description 내 db 에 유저를 추가하는 함수, 이때 user-service 도 같이 추가
   */
  async createUser(userId: string, username: string) {
    const user = this.userRepository.create({ id: userId, username });
    await this.userRepository.save(user);
  }

  /**
   * @inner
   * @description 해당 유저를 지우는 함수
   */
  async deleteUser(userId: string) {
    await this.userRepository.delete({ id: userId });
  }
}
