import { Injectable } from '@nestjs/common';

import axios from 'axios';
@Injectable()
export class PerformanceService {
  audits = {};

  async getAudit(): Promise<any> {
    const res = await axios.get(
      `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=performance&strategy=mobile&url=${process.env.URL_TESTED}&key=${process.env.GOOGLE_API_KEY}`,
      {
        headers: {
          Accept: `application/json`,
        },
      },
    );
    if (res.status === 200) {
      this.audits = res.data.loadingExperience.metrics;
    }

    console.log(`process.env`, res.data.loadingExperience);
    return this.audits;
  }
}
