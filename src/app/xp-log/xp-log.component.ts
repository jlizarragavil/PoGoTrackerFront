import { Component, OnInit } from '@angular/core';
import { XpServiceService } from '../service/xp-service.service';
import { XPRecord, XPTracker } from '../model/XpInterface';
import { DatePipe } from '@angular/common';
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

  constructor(private xpServiceService: XpServiceService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.selectedOverviewWeek=1500000;
    const id = 'xpTrackerXDChus3';
    this.xpServiceService.getXpRecordById(id).subscribe(
      data => {
        this.xpRecords = data;
        this.xpRecordsTable = this.xpRecords?.xpRecords || [];
        if (this.xpRecords && this.xpRecords.xpRecords && this.xpRecords.xpRecords.length > 0) {
          this.average = this.xpRecords.xpRecords[this.xpRecords.xpRecords.length - 1].avgDailyXp;
          this.totalXpToFifty = 176000000 - this.xpRecords.xpRecords[this.xpRecords.xpRecords.length - 1].totalXP;
          this.daysNeeded = this.totalXpToFifty / this.average;
        }
        
        console.log(this.xpRecords);
        console.log(this.xpRecordsTable);
        console.log(this.average)
        if (this.xpRecords && Array.isArray(this.xpRecords.xpRecords)) {
          this.updateOverviewChart(this.xpRecords.xpRecords, 7);
        }
      },
      error => {
        console.error('Error fetching XP record by ID', error);
      }

    ); 
    for (let id = 100000; id <= 4000000; id += 100000) {
      this.xpGraphic.push(id);
    }
    this.changeXpLimit(null, this.selectedOverviewWeek);
  }
  changeTableLength(length: number){
    if (this.xpRecords && Array.isArray(this.xpRecords.xpRecords)) {
      this.updateOverviewChart(this.xpRecords.xpRecords, length);
    }
  }
  async addXPRecord() {
    const id = 'xpTrackerXDChus3';
    console.log(this.xpEvent)
    console.log(this.luckyEgg)
    console.log()
    if (this.newXpValue !== null) {
      try {
        await this.xpServiceService.addXPRecord(id, this.newXpValue, this.xpEvent, this.luckyEgg).toPromise();
    
        const data = await this.xpServiceService.getXpRecordById(id).toPromise();
    
        this.xpRecords = data;
        this.xpRecordsTable = this.xpRecords?.xpRecords || [];
        if (this.xpRecords && this.xpRecords.xpRecords && this.xpRecords.xpRecords.length > 0) {
          this.average = this.xpRecords.xpRecords[this.xpRecords.xpRecords.length - 1].avgDailyXp;
          this.totalXpToFifty = 176000000 - this.xpRecords.xpRecords[this.xpRecords.xpRecords.length - 1].totalXP;
          this.daysNeeded = this.totalXpToFifty / this.average;
        }
        
        console.log(this.xpRecords);
        console.log(this.average);
    
        if (this.xpRecords && Array.isArray(this.xpRecords.xpRecords)) {
          console.log("Va a entrar")
          this.updateOverviewChart(this.xpRecords.xpRecords, 7);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  changeXpLimit(event: any, startValue:any){
    console.log(event)
    if(event!=null){
      this.overviewChartOptions = this.getOrdersOptions(event.value);
    }else{
      this.overviewChartOptions = this.getOrdersOptions(startValue);
    }
    
  }
  updateOverviewChart( xpRecords: XPRecord[], tableLength:number) {
    if (!this.xpRecords) {
      return;
    }
    const labels = xpRecords.slice(-tableLength).map(record => this.datePipe.transform(record.date, 'shortDate'));
    const data = xpRecords.slice(-tableLength).map(record => record.dailyXPDifference);
    console.log(this.xpRecords) 
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

    if (this.overviewChartOptions && this.overviewChartOptions.refresh) {
      this.overviewChartOptions.refresh();
    }
  }
  getOrdersOptions(xpLimit:any) {
    console.log("xpLimit: ", xpLimit)
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
          max: xpLimit,
          min: 0,
          ticks: {
            stepSize: 0,
            callback: function (value: any, index: any) {
              if (index === 0) {
                return value;
              }
              else {
                if(value /1000 <1000){
                  return (value /1000) + "K";
                }else{
                  return (value /1000000) + "M";
                }
               
              }
            },

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
}
