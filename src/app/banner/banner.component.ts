import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Co2SavingsService } from '../co2-savings.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  host: {
    '(document:click)': 'documentClick($event)',
  }
})
export class BannerComponent implements OnInit {


  displayUnitsModal: boolean = false;
  energyUnits: string;
  energyUnitsSub: Subscription;
  constructor(private co2SavingsService: Co2SavingsService, private eRef: ElementRef) { }

  ngOnInit(): void {
    this.energyUnitsSub = this.co2SavingsService.energyUnits.subscribe(val => {
      this.energyUnits = val;
    })
  }

  ngOnDestroy(){
    this.energyUnitsSub.unsubscribe();
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

  toggleUnitsModal(){
    this.displayUnitsModal = !this.displayUnitsModal;
  }

  setUnits(str: string){
    this.co2SavingsService.energyUnits.next(str);
  }

  documentClick() {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.displayUnitsModal = false;
    }
  }
}
