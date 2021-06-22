import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Co2SavingsService {

  baselineData: BehaviorSubject<Array<Co2SavingsData>>;
  modificationData: BehaviorSubject<Array<Co2SavingsData>>;
  energyUnits: BehaviorSubject<string>;
  constructor() {
    this.energyUnits = new BehaviorSubject<string>('MMBtu');
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
    let energyUnits: string = this.energyUnits.getValue();
    //use copy for conversion data
    let dataCpy: Co2SavingsData = JSON.parse(JSON.stringify(data));
    if (energyUnits != 'MMBtu' && data.energyType == 'fuel') {
      //1 GJ = .947813 MMBtu
      let conversionHelper: number = 0.947813;
      dataCpy.totalEmissionOutputRate = dataCpy.totalEmissionOutputRate / conversionHelper;
      dataCpy.energyUse = dataCpy.energyUse * 0.947813;
    }
    else if (data.energyType == 'fugitive') {
      // 1 lb = 0.453592 kg
      let conversionHelper: number = 0.453592;
      dataCpy.totalEmissionOutputRate = dataCpy.totalEmissionOutputRate * conversionHelper;
    }
    if (dataCpy.totalEmissionOutputRate && dataCpy.energyUse) {
      //set results on original obj
      data.totalEmissionOutput = (dataCpy.totalEmissionOutputRate) * (dataCpy.energyUse / 1000);
    } else {
      data.totalEmissionOutput = 0;
    }
    return data;
  }

  generateExample() {
    let emissionOutputRate: number = 53.06;
    let energyUse: number = 1995;
    let energyUnits: string = this.energyUnits.getValue();

    if (energyUnits != 'MMBtu') {
      //1 MMBtu = 1.05506 GJ
      let conversionHelper: number = 1.05506;
      emissionOutputRate = emissionOutputRate / conversionHelper;
      emissionOutputRate = Number(emissionOutputRate.toFixed(3));
      energyUse = energyUse * conversionHelper;
      energyUse = Number(energyUse.toFixed(3));
    }
    this.baselineData.next([{
      energyType: 'fuel',
      totalEmissionOutputRate: emissionOutputRate,
      energyUse: energyUse,
      fuelType: 'Natural Gas',
      energySource: 'Natural Gas',
      totalEmissionOutput: 0
    }]);

    energyUse = 1500;
    if (energyUnits != 'MMBtu') {
      //1 MMBtu = 1.05506 GJ
      let conversionHelper: number = 1.05506;
      energyUse = energyUse * conversionHelper;
      energyUse = Number(energyUse.toFixed(3));
    }
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
  mobileType?: string;
  fugitiveType?: string;
  eGridRegion?: string;
  eGridSubregion?: string;
  totalEmissionOutput: number;
}