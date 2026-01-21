import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MobileTypeProperties } from './co2MobileSavings';
import { MarketYearEmissions } from './e-grid.service';
import { GlobalWarmingPotential } from './co2FugitiveSavings';

@Injectable({
  providedIn: 'root'
})
export class Co2SavingsService {

  currentField: BehaviorSubject<string>;
  baselineData: BehaviorSubject<Array<Co2SavingsData>>;
  modificationData: BehaviorSubject<Array<Co2SavingsData>>;
  energyUnits: BehaviorSubject<string>;
  gwpVersion: BehaviorSubject<GwpVersion>;
  modalOpen: BehaviorSubject<boolean>;
  constructor() {
    this.currentField = new BehaviorSubject<string>('default');
    this.modalOpen = new BehaviorSubject<boolean>(false);
    this.energyUnits = new BehaviorSubject<string>('MMBtu');
    this.gwpVersion = new BehaviorSubject<GwpVersion>('gwp_ar4');
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
    if (data.energyType == 'fugitive' && energyUnits == 'MMBtu') {
      // 1 lb = 0.453592 kg
      let conversionHelper: number = 0.453592;
      dataCpy.totalEmissionOutputRate = dataCpy.totalEmissionOutputRate * conversionHelper;
    }
    //set results on original obj
    if (dataCpy.totalEmissionOutputRate && (data.energyType == 'fugitive' || (data.energyType == 'custom' && data.energySource == 'Fugitive'))) {
      data.totalEmissionOutput = (dataCpy.totalEmissionOutputRate) * (dataCpy.energyUse / 1000);
    } else if (dataCpy.energyUse) {
      data.totalEmissionOutput = (dataCpy.energyUse) * (dataCpy.carbonFactor + dataCpy.methaneFactor * 25 / 1000 + dataCpy.nitrousFactor * 298 / 1000);
      //convert results kg to tonne
      data.totalEmissionOutput = data.totalEmissionOutput * .001;

    } else {
      data.totalEmissionOutput = 0;
    }
    return data;
  }

  generateExample() {
    let energyUse: number = 1995;
    let energyUnits: string = this.energyUnits.getValue();
    let carbonFactor: number = 53.05;
    let methaneFactor: number = 1;
    let nitrousFactor: number = .1;

    if (energyUnits != 'MMBtu') {
      energyUse = this.convertMMBtuToGJ(energyUse);
      carbonFactor = this.convertPerMMBtuToPerGJ(carbonFactor);
      methaneFactor = this.convertPerMMBtuToPerGJ(methaneFactor);
      nitrousFactor = this.convertPerMMBtuToPerGJ(nitrousFactor);
    }
    this.baselineData.next([{
      energyType: 'fuel',
      totalEmissionOutputRate: 0,
      energyUse: energyUse,
      fuelType: 'Natural Gas',
      energySource: 'Natural Gas',
      totalEmissionOutput: 0,
      carbonFactor: carbonFactor,
      methaneFactor: methaneFactor,
      nitrousFactor: nitrousFactor
    }]);

    energyUse = 1500;
    if (energyUnits != 'MMBtu') {
      energyUse = this.convertMMBtuToGJ(energyUse);
    }
    this.modificationData.next([{
      energyType: 'fuel',
      totalEmissionOutputRate: 0,
      energyUse: energyUse,
      fuelType: 'Natural Gas',
      energySource: 'Natural Gas',
      totalEmissionOutput: 0,
      carbonFactor: carbonFactor,
      methaneFactor: methaneFactor,
      nitrousFactor: nitrousFactor
    }]);
  }

  convertMMBtuToGJ(value: number): number {
    //1 MMBtu = 1.05506 GJ
    let conversionHelper: number = 1.05506;
    value = value * conversionHelper;
    value = Number(value.toFixed(3));
    return value;
  }

  convertPerMMBtuToPerGJ(value: number): number {
    //1 MMBtu = 1.05506 GJ
    let conversionHelper: number = 1.05506;
    value = value / conversionHelper;
    value = Number(value.toFixed(3));
    return value;
  }

  convertMobile(mobileOption: MobileTypeProperties): MobileTypeProperties {
    let energyUnits: string = this.energyUnits.getValue();
    if (energyUnits == 'MMBtu') {
      return mobileOption;
    } else {
      let conversionHelper: number = 1.459972
      if (mobileOption.imperialUnit == 'gal') {
        //convert to /L
        //1 gal = 3.785412 L
        conversionHelper = 3.785412;
      } else if (mobileOption.imperialUnit == 'scf') {
        //convert to /m3
        //1 scf = .028317 m3
        conversionHelper = .028317;
      } else if (mobileOption.imperialUnit == 'vehicle-mile' || mobileOption.imperialUnit == 'passanger-mile' || mobileOption.imperialUnit == 'ton-mile') {
        //convert to km
        //1 ton-mile = 1.459972 tonne-kilometer
        conversionHelper = 1.459972
      }
      mobileOption.carbonFactor = mobileOption.carbonFactor / conversionHelper;
      mobileOption.carbonFactor = Number(mobileOption.carbonFactor.toFixed(3));
      mobileOption.methaneFactor = mobileOption.methaneFactor / conversionHelper;
      mobileOption.methaneFactor = Number(mobileOption.methaneFactor.toFixed(3));
      mobileOption.nitrousFactor = mobileOption.nitrousFactor / conversionHelper;
      mobileOption.nitrousFactor = Number(mobileOption.nitrousFactor.toFixed(3));
      return mobileOption;
    }
  }

  getIPCCReportWarmingPotential(fugitiveType: GlobalWarmingPotential): number {
    let gwpVersion: GwpVersion = this.gwpVersion.getValue();
    let warmingPotential: number;
    switch (gwpVersion) {
      case 'gwp_ar4':
        warmingPotential = fugitiveType.gwp_ar4;
        break;
      case 'gwp_ar5':
        warmingPotential = fugitiveType.gwp_ar5;
        break;
      case 'gwp_ar6':
        warmingPotential = fugitiveType.gwp_ar6;
        break;
      default:
        warmingPotential = fugitiveType.gwp_ar4;
    }
    return warmingPotential;
  }

}


export interface Co2SavingsData {
  energyType: 'fuel' | 'electricity' | 'custom' | 'mobile' | 'fugitive';
  totalEmissionOutputRate: number;
  energyUse: number;
  energySource?: string;
  fuelType?: string;
  mobileType?: string;
  fugitiveType?: string;
  eGridRegion?: string;
  eGridSubregion?: string;
  totalEmissionOutput: number;
  selectedEmissionsMarket?: MarketYearEmissions;
  customUnits?: string;
  carbonFactor?: number;
  methaneFactor?: number;
  nitrousFactor?: number;
  zipcode?: string,
  emissionFactors?: 'Location' | 'Residual' | 'Projection',
  geaRegion?: string,
}

export type GwpVersion = 'gwp_ar4' | 'gwp_ar5' | 'gwp_ar6';