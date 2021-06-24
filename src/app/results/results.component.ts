import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { Subscription } from 'rxjs';
import { Co2SavingsData, Co2SavingsService } from '../co2-savings.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @ViewChild('gaugeChart', { static: false }) gaugeChart: ElementRef;

  baselineData: Array<Co2SavingsData>;
  baselineDataSub: Subscription;
  modificationData: Array<Co2SavingsData>;
  modificationDataSub: Subscription;
  baselineTotal: number;
  modificationTotal: number;
  energyUnitsSub: Subscription;
  constructor(private co2SavingsService: Co2SavingsService, private plotlyService: PlotlyService) { }

  ngOnInit(): void {
    this.energyUnitsSub = this.co2SavingsService.energyUnits.subscribe(val => {
      this.drawChart();
    });
    this.baselineDataSub = this.co2SavingsService.baselineData.subscribe(val => {
      this.baselineData = this.setResults(val);
      this.baselineTotal = this.getTotal(this.baselineData);
      this.drawChart();
    });

    this.modificationDataSub = this.co2SavingsService.modificationData.subscribe(val => {
      this.modificationData = this.setResults(val);
      this.modificationTotal = this.getTotal(this.modificationData);
      this.drawChart();
    });
  }

  ngAfterViewInit() {
    this.drawChart();
  }


  ngOnDestroy() {
    this.baselineDataSub.unsubscribe();
    this.modificationDataSub.unsubscribe();
    this.energyUnitsSub.unsubscribe();
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

  drawChart() {
    if (this.gaugeChart) {
      let data = [
        {
          name: "Baseline",
          type: "bar",
          x: this.baselineData.map((data, index) => { return "Energy Use #" + (index + 1) }),
          y: this.baselineData.map(data => { return data.totalEmissionOutput }),
          marker: {
            color: '#BF3D00'
          }
        },
      ]
      if (this.modificationData) {
        data.push(
          {
            name: "Modification",
            type: "bar",
            x: this.modificationData.map((data, index) => { return "Energy Use #" + (index + 1) }),
            y: this.modificationData.map(data => { return data.totalEmissionOutput }),
            marker: {
              color: '#145A32'
            }
          })
      }

      if(this.baselineData.length > 1 || (this.modificationData && this.modificationData.length > 1)){
        data[0].x.unshift("Total");
        data[0].y.unshift(this.baselineTotal);
        if(this.modificationData){
          data[1].x.unshift("Total");
          data[1].y.unshift(this.modificationTotal);
        };
      }


      var layout = {
        font: {
          family: "Helvetica Neue, sans-serif"
        },
        title: {
          text: 'CO<sub>2e</sub> Savings',
          font: {
            family: "Helvetica Neue, sans-serif",
            size: 18
          }
        },
        xaxis: {
        },
        yaxis: {
          title: {
            text: 'tonne CO<sub>2e</sub>',
            font: {
              family: "Helvetica Neue, sans-serif",
              size: 18
            }
          }
        },
        legend: {
          orientation: 'h'
        }
      };
      let config = {
        displaylogo: false,
        displayModeBar: false,
        responsive: true
      };
      this.plotlyService.newPlot(this.gaugeChart.nativeElement, data, layout, config);
    }


  }


}
