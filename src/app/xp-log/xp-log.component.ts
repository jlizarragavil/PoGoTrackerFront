import { Component, OnInit } from '@angular/core';
import { XpServiceService } from '../service/xp-service.service';
import { XPRecord, XPTracker } from '../model/XpInterface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-xp-log',
  templateUrl: './xp-log.component.html',
  styleUrl: './xp-log.component.css',
  providers: [DatePipe]
})
export class XpLogComponent implements OnInit {

  tableLengthInput: number = 0;
  xpGraphic: number[] = [];
  selectedOverviewWeek: any;
  overviewChart: any;
  overviewChartOptions: any;
  average: any;
  totalXpToFifty: any;
  daysNeeded: any;
  xpRecords: XPTracker | null = null;
  xpRecordsTable: XPRecord[] = [];
  newXpValue: number | null = null;
  xpEvent: any;
  luckyEgg: any;
  username: string | null = '';
  isLoggedIn: boolean = false;

  constructor(private xpServiceService: XpServiceService, private datePipe: DatePipe, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.username = this.authService.getUsername();
    this.selectedOverviewWeek = 2500000;
    if (this.username && this.isLoggedIn) {
      this.fetchXpRecords();
    }

    for (let id = 100000; id <= 5000000; id += 100000) {
      this.xpGraphic.push(id);
    }
    this.changeXpLimit(null, this.selectedOverviewWeek);
    //this.changeTableLength(15)
  }

  fetchXpRecords(): void {
    this.xpServiceService.getXpRecordById(this.username!).subscribe(
      data => {
        this.xpRecords = data;
        this.xpRecordsTable = this.calculateDailyXP(this.xpRecords?.xpRecords || []);
        this.updateStatistics();
        if (this.xpRecords && Array.isArray(this.xpRecords.xpRecords)) {
          this.updateOverviewChart(this.xpRecords.xpRecords, 7);
        }
      },
      error => {
        console.error('Error fetching XP record by ID', error);
      }
    );
  }

  changeTableLength(length: number): void {
    if (this.xpRecords && Array.isArray(this.xpRecords.xpRecords)) {
      this.updateOverviewChart(this.xpRecords.xpRecords, length);
    }
  }

  async addXPRecord() {
    const id = this.username;
    if (this.newXpValue !== null && id) {
      try {
        await this.xpServiceService.addXPRecord(id, this.newXpValue, this.xpEvent, this.luckyEgg).toPromise();
        this.fetchXpRecords();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  changeXpLimit(event: any, startValue: any): void {
    this.overviewChartOptions = this.getOrdersOptions(event ? event.value : startValue);
  }

  updateOverviewChart(xpRecords: XPRecord[], tableLength: number): void {
    const dailyXP = this.calculateDailyXP(xpRecords);
    const labels = dailyXP.map(record => this.datePipe.transform(record.date, 'shortDate')!).slice(-tableLength);
    const data = dailyXP.map(record => record.dailyXPDifference).slice(-tableLength);
    const maxXP = Math.max(...data);
    const roundedMaxXP = this.roundUpToNearest500000(maxXP);

    this.overviewChart = {
      labels: labels,
      datasets: [
        {
          label: 'Avg Daily XP',
          data: data,
          borderColor: 'red',
          pointBorderColor: 'purple',
          pointBackgroundColor: 'purple',
          type: 'line',
          fill: true,
        }
      ]
    };

    this.overviewChartOptions = this.getOrdersOptions(roundedMaxXP);

    if (this.overviewChartOptions && this.overviewChartOptions.refresh) {
      this.overviewChartOptions.refresh();
    }
  }

  calculateDailyXP(xpRecords: XPRecord[]): XPRecord[] {
    const dailyXP: { [date: string]: XPRecord } = {};

    xpRecords.forEach(record => {
      const date = this.datePipe.transform(record.date, 'shortDate')!;
      if (!dailyXP[date]) {
        dailyXP[date] = { ...record };
        dailyXP[date].avgDailyXp = 0; // Initialize avgDailyXp
      } else {
        dailyXP[date].dailyXPDifference += record.dailyXPDifference;
      }
    });

    const dailyXPArray = Object.values(dailyXP);
    dailyXPArray.forEach((record, index) => {
      const totalXP = dailyXPArray.slice(0, index + 1).reduce((sum, rec) => sum + rec.dailyXPDifference, 0);
      record.avgDailyXp = totalXP / (index + 1);
    });

    return dailyXPArray;
  }

  updateStatistics(): void {
    if (!this.xpRecords) {
      return;
    }

    const dailyXP = this.calculateDailyXP(this.xpRecords.xpRecords);
    const totalXP = dailyXP.reduce((sum, xp) => sum + xp.dailyXPDifference, 0);
    const daysCount = dailyXP.length;

    this.average = totalXP / daysCount;
    this.totalXpToFifty = 176000000 - this.xpRecords.xpRecords[this.xpRecords.xpRecords.length - 1].totalXP;
    this.daysNeeded = this.totalXpToFifty / this.average;
  }

  getOrdersOptions(maxXP: any) {
    return {
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true,
      hover: {
        mode: 'index'
      },
      scales: {
        y: {
          max: maxXP,
          min: 0,
          ticks: {
            stepSize: 0,
            callback: function (value: any, index: any) {
              if (index === 0) {
                return value;
              } else {
                return value / 1000000 < 1 ? (value / 1000) + 'K' : (value / 1000000) + 'M';
              }
            }
          },
          grid: {
            borderDash: [2, 2],
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          }
        }
      }
    };
  }

  roundUpToNearest500000(value: number): number {
    const remainder = value % 500000;
    if (remainder === 0) {
      return value;
    }
    return value + (500000 - remainder);
  }
}
