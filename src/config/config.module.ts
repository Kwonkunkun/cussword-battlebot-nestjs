import { Module } from '@nestjs/common';
import { ConfigModule as NestJsConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * custom config module
 */
@Module({
  imports: [
    NestJsConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: (() => {
        //개발 환경일 경우에는 .env.dev 를 사용하고, 그 외에는 fly.io 환경에 있는 변수를 사용한다.
        const isDev = process.env.APP_ENV === 'dev';
        if (!isDev) {
          return;
        }

        console.log(`.env.${process.env.APP_ENV}`);
        return `.env.${process.env.APP_ENV}`;
      })(),
      validationSchema: Joi.object({
        SLACK_BOT_TOKEN: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
