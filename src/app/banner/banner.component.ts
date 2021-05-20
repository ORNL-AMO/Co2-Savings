import { Component, OnInit } from '@angular/core';
import { Co2SavingsService } from '../co2-savings.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private co2SavingsService: Co2SavingsService) { }

  ngOnInit(): void {
  }

  resetData(){
    this.co2SavingsService.baselineData.next([{
      energyType: 'fuel',
      totalEmissionOutputRate: undefined,
      energyUse: undefined,
      energySource: undefined,
      fuelType: undefined,
      eGridRegion: undefined,
      eGridSubregion: undefined,
      totalEmissionOutput: undefined
    }]);
    this.co2SavingsService.modificationData.next(undefined);
  }

  generateExample(){
    this.co2SavingsService.generateExample();
  }

}
