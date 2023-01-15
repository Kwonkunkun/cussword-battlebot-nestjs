import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { User } from './typeorm/entities/user';
import { SlackModule } from './modules/slack/slack.module';
import { SlackModule as SlackListenerModule } from '@int31302/nestjs-slack-listener';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User],
          synchronize: true,
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
  ],
  providers: [],
})
export class AppModule {}
