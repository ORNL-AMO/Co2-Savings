import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Co2SavingsData, Co2SavingsService } from 'src/app/co2-savings.service';
import { FuelTypeProperties, OtherFuel, otherFuels } from 'src/app/co2FuelSavingsFuels';
import { FugitiveTypeProperties, Fugitive, fugitives } from 'src/app/co2FugitiveSavings';
import { eGridRegion, electricityGridRegions, SubRegionData } from 'src/app/electricityGridRegions';
import { customEmissions, Custom, CustomTypeProperties } from 'src/app/co2CustomSavings';
import { MobileEmission, MobileTypeProperties, mobileEmissions } from 'src/app/co2MobileSavings';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input()
  index: number;
  @Input()
  isBaseline: boolean;
  @Input()
  selected: boolean;

  data: Co2SavingsData;
  dataSub: Subscription;
  modId: string;
  otherFuels: Array<OtherFuel>;
  fugitives: Array<Fugitive>;
  customEmissions: Array<Custom>;
  mobileEmissions: Array<MobileEmission>;
  eGridRegions: Array<eGridRegion>;
  fuelOptions: Array<FuelTypeProperties>;
  mobileOptions: Array<MobileTypeProperties>;
  fugitiveOptions: Array<FugitiveTypeProperties>;
  customOptions: CustomTypeProperties;
  subregions: Array<SubRegionData>;
  isFormChange: boolean = false;
  energyUnitsSub: Subscription;
  energyUnits: string;
  mobileUnits: string;
  carbonEmissions: number = 0;
  methaneEmissions: number = 0;
  nitrousEmissions: number = 0;
  constructor(private co2SavingsService: Co2SavingsService) { }

  ngOnInit(): void {
    this.energyUnitsSub = this.co2SavingsService.energyUnits.subscribe(val => {
      this.energyUnits = val;
    })
    this.mobileUnits = 'gal';
    this.otherFuels = otherFuels;
    this.mobileEmissions = mobileEmissions;
    this.fugitives = fugitives;
    this.customEmissions = customEmissions;
    this.eGridRegions = electricityGridRegions;
    if (this.isBaseline) {
      this.modId = '_baseline_';
      this.dataSub = this.co2SavingsService.baselineData.subscribe(val => {
        if (this.isFormChange == false && val && val[this.index]) {
          this.data = val[this.index];
          this.initOptions();
        } else {
          this.isFormChange = false;
        }
      });
    } else {
      this.modId = '_modification_';
      this.dataSub = this.co2SavingsService.modificationData.subscribe(val => {
        if (this.isFormChange == false && val && val[this.index]) {
          this.data = val[this.index];
          this.initOptions();
        } else {
          this.isFormChange = false;
        }
      });
    }
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.energyUnitsSub.unsubscribe();
  }

  initOptions() {
    let tmpOtherFuel: OtherFuel = this.otherFuels.find((val) => { return this.data.energySource === val.energySource; });
    if (tmpOtherFuel) {
      this.fuelOptions = tmpOtherFuel.fuelTypes;
      let selectedOption: FuelTypeProperties =  this.fuelOptions.find(option => { return this.data.fuelType == option.fuelType});
      if(selectedOption){
        this.methaneEmissions = selectedOption.methaneFactor;
        this.carbonEmissions = selectedOption.carbonFactor;
        this.methaneEmissions = selectedOption.methaneFactor;
        this.nitrousEmissions = selectedOption.nitrousFactor;
      }
    }
    let tmpFugitive: Fugitive = this.fugitives.find((val) => { return this.data.energySource === val.energySource});
    if (tmpFugitive) {
      this.fugitiveOptions = tmpFugitive.fugitiveTypes;
    }

    let tmpCustom: Custom = this.customEmissions.find((val) => { return this.data.energySource === val.energySource});
    if (tmpCustom) {
      this.customOptions = tmpCustom.customType;
    }
    let tmpRegion: eGridRegion = this.eGridRegions.find((val) => { return this.data.eGridRegion === val.region; });
    if (tmpRegion) {
      this.subregions = tmpRegion.subregions;
      let selectedOption: SubRegionData =  this.subregions.find(option => { return this.data.eGridRegion == option.subregion});
      if(selectedOption){
        this.methaneEmissions = selectedOption.methaneFactor;
        this.carbonEmissions = selectedOption.carbonFactor;
        this.methaneEmissions = selectedOption.methaneFactor;
        this.nitrousEmissions = selectedOption.nitrousFactor;
      }
    }
    let tmpMobile: MobileEmission = this.mobileEmissions.find((val) => { return this.data.energySource === val.energySource; });
    if (tmpMobile) {
      this.mobileOptions = tmpMobile.mobileTypes;
      let selectedOption: MobileTypeProperties =  this.mobileOptions.find(option => { return this.data.mobileType == option.mobileType});
      if(selectedOption){
        this.methaneEmissions = selectedOption.methaneFactor;
        this.carbonEmissions = selectedOption.carbonFactor;
        this.methaneEmissions = selectedOption.methaneFactor;
        this.nitrousEmissions = selectedOption.nitrousFactor;
      }
    }
  }

  changeEnergyType() {
    this.data.eGridRegion = undefined;
    this.data.eGridSubregion = undefined;
    this.data.energyUse = undefined;
    this.data.totalEmissionOutputRate = undefined;
    this.data.fuelType = undefined;
    this.data.mobileType = undefined;
    this.data.energySource = undefined;
    this.data.methaneFactor = undefined;
    this.data.nitrousFactor = undefined;
    this.carbonEmissions = 0;
    this.methaneEmissions = 0;
    this.nitrousEmissions = 0;
    this.save();
  }

  setCustomOptions() {
    let tmpCustom: Custom = this.customEmissions.find((val) => { return this.data.energySource === val.energySource});
    this.customOptions = tmpCustom.customType;
    if (this.data.energySource == 'Fugitive') {
      this.data.totalEmissionOutputRate = this.customOptions.warmingPotential;
    }

    else {
      this.data.totalEmissionOutputRate = this.customOptions.carbonFactor;
    }
    this.data.customUnits = this.customOptions.unit;
    this.save();
  }

  setFugitiveOptions() {
    let tmpFugitive: Fugitive = this.fugitives.find((val) => { return this.data.energySource === val.energySource });
    this.fugitiveOptions = tmpFugitive.fugitiveTypes;
    this.data.fugitiveType = undefined;
    this.data.totalEmissionOutputRate = undefined;
    this.save();
  }

  setFuelOptions() {
    let tmpOtherFuel: OtherFuel = this.otherFuels.find((val) => { return this.data.energySource === val.energySource; });
    this.fuelOptions = tmpOtherFuel.fuelTypes;
    this.carbonEmissions = 0;
    this.methaneEmissions = 0;
    this.nitrousEmissions = 0;
    this.data.fuelType = undefined;
    this.data.totalEmissionOutputRate = undefined;
    this.save();
  }
  setFuel() {
    let tmpFuel: FuelTypeProperties = this.fuelOptions.find((val) => { return this.data.fuelType === val.fuelType; });
    this.data.totalEmissionOutputRate = tmpFuel.carbonFactor;
    this.carbonEmissions = tmpFuel.carbonFactor;
    this.methaneEmissions = tmpFuel.methaneFactor;
    this.nitrousEmissions = tmpFuel.nitrousFactor;
    this.save();
  }

  setFugitive() {
    let tmpNewFugitive: FugitiveTypeProperties = this.fugitiveOptions.find((val) => { return this.data.fugitiveType === val.fugitiveType; });
    this.data.totalEmissionOutputRate = tmpNewFugitive.warmingPotential;
    this.save();
  }


  setRegion() {
    let tmpRegion: eGridRegion = this.eGridRegions.find((val) => { return this.data.eGridRegion === val.region; });
    this.subregions = tmpRegion.subregions;
    this.carbonEmissions = 0;
    this.methaneEmissions = 0;
    this.nitrousEmissions = 0;
    this.data.eGridSubregion = undefined;
    this.data.totalEmissionOutputRate = undefined;
    this.save();
  }
  setSubRegion() {
    let tmpSubRegion: SubRegionData = this.subregions.find((val) => { return this.data.eGridSubregion === val.subregion; });
    this.data.totalEmissionOutputRate = tmpSubRegion.carbonFactor;
    this.carbonEmissions = tmpSubRegion.carbonFactor;
    this.methaneEmissions = tmpSubRegion.methaneFactor;
    this.nitrousEmissions = tmpSubRegion.nitrousFactor;
    this.save();
  }
  setMobileOptions() {
    let tmpMobile: MobileEmission = this.mobileEmissions.find((val) => { return this.data.energySource === val.energySource; });
    this.mobileOptions = tmpMobile.mobileTypes;
    if (this.data.energySource == 'Commuter Vehicles') {
      this.mobileUnits = 'passenger-mile';
    }
    else if (this.data.energySource == 'Transportation')  {
      this.mobileUnits = 'ton-mile';
    }
    this.data.mobileType = undefined;
    this.data.totalEmissionOutputRate = undefined;
    this.carbonEmissions = 0;
    this.methaneEmissions = 0;
    this.nitrousEmissions = 0;
    this.save();
  }
  setMobile() {
    let tmpMobile: MobileTypeProperties = this.mobileOptions.find((val) => { return this.data.mobileType === val.mobileType; });
    this.data.totalEmissionOutputRate = tmpMobile.carbonFactor;
    this.carbonEmissions = tmpMobile.carbonFactor;
    this.methaneEmissions = tmpMobile.methaneFactor;
    this.nitrousEmissions = tmpMobile.nitrousFactor;
    this.mobileUnits = tmpMobile.unit;
    this.save();
  }

  save() {
    this.isFormChange = true;
    if (this.isBaseline) {
      let baselineData: Array<Co2SavingsData> = this.co2SavingsService.baselineData.getValue();
      baselineData[this.index] = this.data;
      this.co2SavingsService.baselineData.next(baselineData);
    } else {
      let modificationData: Array<Co2SavingsData> = this.co2SavingsService.modificationData.getValue();
      modificationData[this.index] = this.data;
      this.co2SavingsService.modificationData.next(modificationData);
    }
  }
}
