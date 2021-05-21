import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Co2SavingsService {

  baselineData: BehaviorSubject<Array<Co2SavingsData>>;
  modificationData: BehaviorSubject<Array<Co2SavingsData>>;
  constructor() {
    this.baselineData = new BehaviorSubject<Array<Co2SavingsData>>([{
      energyType: 'fuel',
      totalEmissionOutputRate: undefined,
      energyUse: undefined,
      energySource: undefined,
      fuelType: undefined,
      eGridRegion: undefined,
      eGridSubregion: undefined,
      totalEmissionOutput: undefined
    }]);
    this.modificationData = new BehaviorSubject<Array<Co2SavingsData>>(undefined);
  }

  setEmissionsOutput(data: Co2SavingsData): Co2SavingsData {
    //use copy for conversion data
    // let dataCpy: Co2SavingsData = JSON.parse(JSON.stringify(data));
    // if (settings.unitsOfMeasure != 'Imperial' && data.energyType == 'Fuel') {
    //   let conversionHelper: number = this.convertUnitsService.value(1).from('GJ').to('MMBtu');
    //   dataCpy.totalEmissionOutputRate = dataCpy.totalEmissionOutputRate / conversionHelper;
    //   dataCpy.electricityUse = this.convertUnitsService.value(dataCpy.electricityUse).from('GJ').to('MMBtu');
    // }
    if (data.totalEmissionOutputRate && data.energyUse) {
      //set results on original obj
      data.totalEmissionOutput = (data.totalEmissionOutputRate) * (data.energyUse / 1000);
    } else {
      data.totalEmissionOutput = 0;
    }
    return data;
  }

  generateExample() {

    let emissionOutputRate: number = 53.06;
    let energyUse: number = 1995;

    // if (settings.unitsOfMeasure != 'Imperial') {
    //   let conversionHelper: number = this.convertUnitsService.value(1).from('MMBtu').to('GJ');
    //   emissionOutputRate = emissionOutputRate / conversionHelper;
    //   emissionOutputRate = Number(emissionOutputRate.toFixed(3));
    //   electricityUse = this.convertUnitsService.value(electricityUse).from('MMBtu').to('GJ');
    //   electricityUse = Number(electricityUse.toFixed(3));
    // }
    this.baselineData.next([{
      energyType: 'fuel',
      totalEmissionOutputRate: emissionOutputRate,
      energyUse: energyUse,
      fuelType: 'Natural Gas',
      energySource: 'Natural Gas',
      totalEmissionOutput: 0
    }]);

    energyUse = 1500;
    this.modificationData.next([{
      energyType: 'fuel',
      totalEmissionOutputRate: emissionOutputRate,
      energyUse: energyUse,
      fuelType: 'Natural Gas',
      energySource: 'Natural Gas',
      totalEmissionOutput: 0
    }]);
  }


}


export interface Co2SavingsData {
  energyType: string;
  totalEmissionOutputRate: number;
  energyUse: number;
  energySource?: string;
  fuelType?: string;
  eGridRegion?: string;
  eGridSubregion?: string;
  totalEmissionOutput: number;
}