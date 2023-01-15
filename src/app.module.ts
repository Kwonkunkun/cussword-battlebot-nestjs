import { Module } from '@nestjs/common';
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [HealthModule],
  providers: [],
})
export class AppModule {}
