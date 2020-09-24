import { Controller, Get } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { Audits } from './performance.interface';

@Controller('performance')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  @Get()
  async getAudit(): Promise<any> {
    return this.performanceService.getAudit();
  }
}
