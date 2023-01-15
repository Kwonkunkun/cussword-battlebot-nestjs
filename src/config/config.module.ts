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
        console.log(`.env.${process.env.APP_ENV ?? 'prod'}`);
        return `.env.${process.env.APP_ENV ?? 'prod'}`;
      })(),
      validationSchema: Joi.object({
        // SLACK_TOKEN: Joi.string().required(),
        // GOOGLE_APPLICATION_CREDENTIALS: Joi.string().required(),
        // DB_HOST: Joi.string().required(),
        // DB_PORT: Joi.number().required(),
        // DB_USERNAME: Joi.string().required(),
        // DB_PASSWORD: Joi.string().required(),
        // DB_DATABASE: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
