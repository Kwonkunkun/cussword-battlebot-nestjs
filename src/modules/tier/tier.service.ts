import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ServiceService } from '../service/service.service';
import { MyService } from '../../constant';
import { UserServiceEntity } from '../../typeorm/entities/user-service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import {
  InjectSlackClient,
  SlackClient,
} from '@int31302/nestjs-slack-listener';
import { UserEntity } from '../../typeorm/entities/user.entity';

@Injectable()
export class TierService {
  private readonly logger = new Logger(TierService.name);

  constructor(
    @InjectRepository(UserServiceEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserServiceEntity)
    private readonly userServiceRepository: Repository<UserServiceEntity>,
    @InjectSlackClient()
    private readonly slack: SlackClient,
    private readonly serviceService: ServiceService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @description slash command (/티어) 를 처리한다.
   */
  async slashCommand(username: string, userId: string, channelId: string) {
    this.logger.debug('start slash command');

    //유저 디비에 있는 유저인지 확인
    const isUser = await this.userService.isUser(userId);
    if (!isUser) {
      await this.userService.createNewUser(userId, username, channelId);
    }

    //해당 유저의 tier 를 가져온다.
    const tier = await this.getTier(userId);

    // tier 에 따라서 다른 메세지를 보낸다.
    const message =
      tier === 'gold'
        ? `🥇 와우! ${username}님의 티어는 ${tier}입니다!!`
        : tier === 'silver'
        ? `🥈 ${username}님의 티어는 ${tier}입니다.`
        : `💩 우~ 👎 ${username}님의 티어는 ${tier}이네여.. 분발점`;

    return {
      text: message,
    };
  }

  /**
   * TODO: 일단 욕에 대한 tier 를 가져오는 것으로 구현했는데, 추후에는 서비스별로 tier 를 가져올 수 있도록 수정해야함.
   * @description 해당 유저의 tier 를 가져온다.
   */
  async getTier(userId: string) {
    const user = await this.userServiceRepository.findOne({
      where: { userId: userId, serviceId: 'cussword' },
    });

    return user.tier;
  }

  /**
   * @description 각 서비스별 tier 에 대한 계산 , 매주 월요일 오전 9시에 실행
   */
  @Cron('0 0 9 * * 1')
  async handleCron() {
    this.logger.debug('start cron job');

    //TODO: 일단 욕에 대한 티어만 계산
    //각 서비스별로 tier 를 계산한다.
    await this.calculateTier('cussword');
    // await this.calculateTier('emergency');
    // await this.calculateTier('other');

    //각 서비스에 대한 count 를 0으로 초기화한다.
    await this.resetCount();

    //cron job 이 끝나면, 모든 유저에게 slack 에 티어 정산이 되었다는 메세지를 보내기.
    await this.sendTierMessageForAllUser();

    this.logger.debug('finish cron job');
  }

  /**
   * @description
   */
  async sendTierMessageForAllUser() {
    //모든 유저를 가져온다.
    const users = await this.userRepository.find();

    //모든 유저에게 slack 에 티어 정산이 되었다는 메세지를 보낸다.
    const promises = users.map(async ({ username, channel }) => {
      const message = `🎉 ${username}님의 티어가 정산되었습니다. 🎉`;
      await this.slack.chat.postMessage({
        channel: channel,
        text: message,
      });
    });
    await Promise.all(promises);
  }

  /**
   * @description 서비스별 tier 에 대한 계산 및 업데이트
   */
  async calculateTier(serviceId: MyService) {
    /**
     * 상위 10%: gold
     * 상위 30%: silver
     * 나머지: bronze
     */

    //각 서비스별 user 의 count 를 가져온다. user 는 count 오름차순으로 정렬되어있다.
    const service = await this.serviceService.getService(serviceId);
    const numOfTotalUser = service.users.length;

    //각 tier 에 대한 계산을 실시한다.
    const goldTierUsers = service.users.slice(
      0,
      Math.ceil(numOfTotalUser * 0.1),
    );

    const silverTierUsers = service.users.slice(
      Math.ceil(numOfTotalUser * 0.1),
      Math.ceil(numOfTotalUser * 0.4),
    );

    const bronzeTierUsers = service.users.slice(
      Math.ceil(numOfTotalUser * 0.4),
      numOfTotalUser,
    );

    //query builder 를 사용하여 각 서비스의 tier 를 한번에 업데이트 한다.
    await this.dataSource.transaction(async (manager) => {
      //gold tier 업데이트
      await manager
        .createQueryBuilder()
        .update(UserServiceEntity)
        .set({
          tier: 'gold',
        })
        .where('userId IN (:...ids)', {
          ids: goldTierUsers.map((user) => user.userId),
        })
        .andWhere('serviceId = :serviceId', { serviceId: serviceId })
        .execute();

      //silver tier 업데이트
      await manager
        .createQueryBuilder()
        .update(UserServiceEntity)
        .set({
          tier: 'silver',
        })
        .where('userId IN (:...ids)', {
          ids: silverTierUsers.map((user) => user.userId),
        })
        .andWhere('serviceId = :serviceId', { serviceId: serviceId })
        .execute();

      //bronze tier 업데이트
      await manager
        .createQueryBuilder()
        .update(UserServiceEntity)
        .set({
          tier: 'bronze',
        })
        .where('userId IN (:...ids)', {
          ids: bronzeTierUsers.map((user) => user.userId),
        })
        .andWhere('serviceId = :serviceId', { serviceId: serviceId })
        .execute();
    });

    this.logger.debug(`gold tier users: ${goldTierUsers.length}`);
    this.logger.debug(`silver tier users: ${silverTierUsers.length}`);
    this.logger.debug(`bronze tier users: ${bronzeTierUsers.length}`);
  }

  /**
   * @description 각 서비스에 대한 count 를 0으로 초기화한다.
   */
  async resetCount() {
    await this.userServiceRepository
      .createQueryBuilder()
      .update()
      .set({ count: 0 })
      .execute();
  }
}
