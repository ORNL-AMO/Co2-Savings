import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Co2SavingsData, Co2SavingsService } from '../co2-savings.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  baselineData: Array<Co2SavingsData>;
  baselineDataSub: Subscription;
  modificationData: Array<Co2SavingsData>;
  modificationDataSub: Subscription;
  baselineTotal: number;
  modificationTotal: number;
  constructor(private co2SavingsService: Co2SavingsService) { }

  ngOnInit(): void {
    this.baselineDataSub = this.co2SavingsService.baselineData.subscribe(val => {
      this.baselineData = this.setResults(val);
      this.baselineTotal = this.getTotal(this.baselineData);
    });

    this.modificationDataSub = this.co2SavingsService.modificationData.subscribe(val => {
      this.modificationData = this.setResults(val);
      this.modificationTotal = this.getTotal(this.modificationData);
    });
  }

  setResults(data: Array<Co2SavingsData>): Array<Co2SavingsData> {
    if (data) {
      data.forEach(item => {
        item = this.co2SavingsService.setEmissionsOutput(item);
      });
    }
    return data;
  }

  getTotal(data: Array<Co2SavingsData>): number {
    let total: number = 0;
    if (data) {
      data.forEach(item => {
        total = total + item.totalEmissionOutput;
      });
    }
    return total;
  }

  ngOnDestroy() {
    this.baselineDataSub.unsubscribe();
    this.modificationDataSub.unsubscribe();
  }

}
