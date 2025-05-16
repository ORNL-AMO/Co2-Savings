import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Co2SavingsData, Co2SavingsService } from '../co2-savings.service';

@Component({
    selector: 'app-energy-use-forms',
    templateUrl: './energy-use-forms.component.html',
    styleUrls: ['./energy-use-forms.component.css'],
    standalone: false
})
export class EnergyUseFormsComponent implements OnInit {
  @Input()
  isBaseline: boolean;
  @Input()
  selected: boolean;

  formData: Array<Co2SavingsData>;
  dataSub: Subscription;
  modId: string;
  constructor(private co2SavingsService: Co2SavingsService) { }

  ngOnInit(): void {
    if (this.isBaseline) {
      this.modId = '_baseline_';
      this.dataSub = this.co2SavingsService.baselineData.subscribe(val => {
        this.formData = val;
      });
    } else {
      this.modId = '_modification_';
      this.dataSub = this.co2SavingsService.modificationData.subscribe(val => {
        this.formData = val;
      });
    }
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  addEnergyUse() {
    let newEnergyUse: Co2SavingsData = {
      energyType: 'fuel',
      totalEmissionOutputRate: undefined,
      energyUse: undefined,
      energySource: undefined,
      fuelType: undefined,
      eGridRegion: undefined,
      eGridSubregion: undefined,
      totalEmissionOutput: undefined
    };
    if (this.isBaseline) {
      let tmpFormData: Array<Co2SavingsData> = this.co2SavingsService.baselineData.getValue();
      tmpFormData.push(newEnergyUse);
      this.co2SavingsService.baselineData.next(tmpFormData);
    } else {
      let tmpFormData: Array<Co2SavingsData> = this.co2SavingsService.modificationData.getValue();
      tmpFormData.push(newEnergyUse);
      this.co2SavingsService.modificationData.next(tmpFormData);
    }
  }

  addModification() {
    let baselineData: Array<Co2SavingsData> = this.co2SavingsService.baselineData.getValue();
    this.co2SavingsService.modificationData.next(JSON.parse(JSON.stringify(baselineData)));
  }

  removeItem(index: number) {
    if (this.isBaseline) {
      let tmpFormData: Array<Co2SavingsData> = this.co2SavingsService.baselineData.getValue();
      tmpFormData.splice(index, 1);
      this.co2SavingsService.baselineData.next(tmpFormData);
    } else {
      let tmpFormData: Array<Co2SavingsData> = this.co2SavingsService.modificationData.getValue();
      tmpFormData.splice(index, 1);
      if (tmpFormData.length != 0) {
        this.co2SavingsService.modificationData.next(tmpFormData);
      } else {
        this.co2SavingsService.modificationData.next(undefined);
      }
    }
  }


}
