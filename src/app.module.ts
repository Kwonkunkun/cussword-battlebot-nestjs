import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './typeorm/entities/user.entity';
import { SlackModule } from './modules/slack/slack.module';
import { SlackModule as SlackListenerModule } from '@int31302/nestjs-slack-listener';
import { ServiceEntity } from './typeorm/entities/service.entity';
import { UserServiceEntity } from './typeorm/entities/user-service.entity';
import { EmergencyModule } from './modules/emergency/emergency.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDev = process.env.APP_ENV === 'dev';
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [UserEntity, ServiceEntity, UserServiceEntity],
          synchronize: isDev,
          logging: isDev,
        };
      },
      inject: [ConfigService],
    }),
    SlackListenerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        botToken: configService.get('SLACK_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    SlackModule,
    EmergencyModule,
  ],
  providers: [],
})
export class AppModule {}
