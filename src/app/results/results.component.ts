import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  graphColors: Array<string> = [
    '#1E7640',
    '#2ABDDA',
    '#84B641',
    '#7030A0',
    '#E1CD00',
    '#306DBE',
    '#A03123',
    '#7FD7E9',
    '#DE762D',
    '#948A54',
    '#A9D58B',
    '#FFE166',
    '#DD7164',
    '#3f4a7d'
  ];

  resultUnit: string;
  constructor(private co2SavingsService: Co2SavingsService, private plotlyService: PlotlyService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.energyUnitsSub = this.co2SavingsService.energyUnits.subscribe(val => {
      if(val == 'MMBtu'){
        this.resultUnit = 'tonne';
      }else{
        this.resultUnit = 'kg';
      }
      this.drawChart();
    });
    this.baselineDataSub = this.co2SavingsService.baselineData.subscribe(val => {
      this.baselineData = this.setResults(val);
      this.baselineTotal = this.getTotal(this.baselineData);
      this.cd.detectChanges();
      this.drawChart();
    });

    this.modificationDataSub = this.co2SavingsService.modificationData.subscribe(val => {
      this.modificationData = this.setResults(val);
      this.modificationTotal = this.getTotal(this.modificationData);
      this.cd.detectChanges();
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
      let data = new Array();
      let numberOfSources: number = 0;
      if (!this.modificationData || this.modificationData.length < this.baselineData.length) {
        numberOfSources = this.baselineData.length;
      } else {
        numberOfSources = this.modificationData.length;
      }

      for (let index = 0; index < numberOfSources; index++) {
        let baselineEmissionOutput: number = 0;
        let modificationEmissionOutput: number = 0;
        if (this.baselineData[index]) {
          baselineEmissionOutput = this.baselineData[index].totalEmissionOutput
        }
        if (this.modificationData && this.modificationData[index]) {
          modificationEmissionOutput = this.modificationData[index].totalEmissionOutput;
        }
        data.push(
          {
            name: "Emissions Source #" + (index + 1),
            type: "bar",
            x: ["Baseline", "Modification"],
            y: [baselineEmissionOutput, modificationEmissionOutput],
            marker: {
              color: this.graphColors[index]
            }
          })
      }

      var layout = {
        font: {
          family: "Helvetica Neue, sans-serif"
        },
        title: {
          text: 'CO<sub>2e</sub> Emissions',
          font: {
            family: "Helvetica Neue, sans-serif",
            size: 18
          }
        },
        xaxis: {
        },
        yaxis: {
          title: {
            text: this.resultUnit +' CO<sub>2e</sub>',
            font: {
              family: "Helvetica Neue, sans-serif",
              size: 18
            }
          }
        },
        legend: {
          orientation: 'h'
        },
        barmode: 'stack'
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
