import { Module } from '@nestjs/common';
import { PerformanceModule } from './performance/performance.module';
@Module({
  imports: [PerformanceModule],
})
export class AppModule {}
