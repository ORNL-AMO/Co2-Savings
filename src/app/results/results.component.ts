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
  constructor(private co2SavingsService: Co2SavingsService, private plotlyService: PlotlyService) { }

  ngOnInit(): void {
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
      let percentValue: number = 0;
      if (this.modificationTotal) {
        percentValue = ((this.baselineTotal - this.modificationTotal) / this.baselineTotal) * 100;
      }

      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: percentValue,
          number: {
            suffix: '%',
            font: {
              family: "Helvetica Neue, sans-serif",
              size: 20
            }
          },
          title: {
            text: 'CO&#8322; Savings',
            font: {
              family: "Helvetica Neue, sans-serif",
              size: 20
            }
          },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: {
              range: [0, 50],
              // tickwidth: 1 
            },
            bar: {
              color: '#145A32'
            }
            // steps: [
            //   { range: [-50, 0], color: "cyan" },
            //   { range: [0, 50], color: "royalblue" }
            // ]
          }
        }
      ];

      var layout = {
        font: {
          family: "Helvetica Neue, sans-serif"
        },
        title: {
          font: {
            family: "Helvetica Neue, sans-serif",
            // size: 18
          }
        },
        xaxis: {

        },
        yaxis: {

        },
        height: 175,
        margin: { t: 50, b: 10, l: 50, r: 50 },
        paper_bgcolor: "#efefef",
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
