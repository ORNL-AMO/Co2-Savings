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
  mobileUnits: string = 'gal';
  fugitiveUnits: string = 'lb';
  constructor(private co2SavingsService: Co2SavingsService) { }

  ngOnInit(): void {
    this.energyUnitsSub = this.co2SavingsService.energyUnits.subscribe(val => {
      this.energyUnits = val;
      if (this.energyUnits == 'MMBtu') {
        this.fugitiveUnits = 'lb';
      } else {
        this.fugitiveUnits = 'kg';
      }
      if (this.data) {
        this.initOptions();
      }
    });
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
    if (this.data.energyType == 'fuel') {
      this.setFuelOptions();
    } else if (this.data.energyType == 'electricity') {
      this.setRegion();
    } else if (this.data.energyType == 'custom') {
      this.setCustomOptions();
    } else if (this.data.energyType == 'mobile') {
      this.setMobileOptions();
    } else if (this.data.energyType == 'fugitive') {
      this.setFugitiveOptions();
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
    this.data.methaneFactor = 0;
    this.data.nitrousFactor = 0;
    this.data.carbonFactor = 0;
    this.save();
  }

  setCustomOptions() {
    let tmpCustom: Custom = this.customEmissions.find((val) => { return this.data.energySource === val.energySource });
    if (tmpCustom) {
      this.customOptions = tmpCustom.customType;
      if (this.data.energySource == 'Fugitive') {
        this.data.totalEmissionOutputRate = this.customOptions.warmingPotential;
      } else {
        this.data.totalEmissionOutputRate = this.customOptions.carbonFactor;
      }
      if (this.energyUnits == 'MMBtu') {
        this.data.customUnits = this.customOptions.imperialUnit;
      } else {
        this.data.customUnits = this.customOptions.metricUnit;
      }
      this.save();
    }
  }

  setFugitiveOptions() {
    let tmpFugitive: Fugitive = this.fugitives.find((val) => { return this.data.energySource === val.energySource });
    if (tmpFugitive) {
      this.fugitiveOptions = tmpFugitive.fugitiveTypes;
      this.data.fugitiveType = undefined;
      this.data.totalEmissionOutputRate = undefined;
      this.save();
    }
  }

  setFuelOptions() {
    let tmpOtherFuel: OtherFuel = this.otherFuels.find((val) => { return this.data.energySource === val.energySource; });
    if (tmpOtherFuel) {
      this.fuelOptions = tmpOtherFuel.fuelTypes;
      let selectedOption: FuelTypeProperties = this.fuelOptions.find(option => { return option.fuelType == this.data.fuelType });
      if (selectedOption) {
        this.setFuelFactors(selectedOption);
      } else {
        this.data.methaneFactor = 0;
        this.data.nitrousFactor = 0;
        this.data.carbonFactor = 0;
        this.data.fuelType = undefined;
        this.data.totalEmissionOutputRate = undefined;
        this.save();
      }
    }
  }
  setFuel() {
    let tmpFuel: FuelTypeProperties = this.fuelOptions.find((val) => { return this.data.fuelType === val.fuelType; });
    if (tmpFuel) {
      this.setFuelFactors(tmpFuel);
    }
  }

  setFuelFactors(selectedOption: FuelTypeProperties) {
    if (this.energyUnits == 'MMBtu') {
      this.data.carbonFactor = selectedOption.carbonFactor;
      this.data.methaneFactor = selectedOption.methaneFactor;
      this.data.nitrousFactor = selectedOption.nitrousFactor;
    } else {
      this.data.carbonFactor = this.co2SavingsService.convertPerMMBtuToPerGJ(selectedOption.carbonFactor);
      this.data.methaneFactor = this.co2SavingsService.convertPerMMBtuToPerGJ(selectedOption.methaneFactor);
      this.data.nitrousFactor = this.co2SavingsService.convertPerMMBtuToPerGJ(selectedOption.nitrousFactor);
    }
    this.save();
  }

  setFugitive() {
    let tmpNewFugitive: FugitiveTypeProperties = this.fugitiveOptions.find((val) => { return this.data.fugitiveType === val.fugitiveType; });
    if (tmpNewFugitive) {
      this.data.totalEmissionOutputRate = tmpNewFugitive.warmingPotential;
      this.save();
    }
  }

  setRegion() {
    let tmpRegion: eGridRegion = this.eGridRegions.find((val) => { return this.data.eGridRegion === val.region; });
    if (tmpRegion) {
      this.subregions = tmpRegion.subregions;
      let selectedOption: SubRegionData = this.subregions.find(option => { return option.subregion == this.data.eGridSubregion });
      if (selectedOption) {
        this.data.carbonFactor = selectedOption.carbonFactor;
        this.data.methaneFactor = selectedOption.methaneFactor;
        this.data.nitrousFactor = selectedOption.nitrousFactor;
      } else {
        this.data.methaneFactor = 0;
        this.data.nitrousFactor = 0;
        this.data.carbonFactor = 0;
        this.data.eGridSubregion = undefined;
        this.data.totalEmissionOutputRate = undefined;
      }
      this.save();
    }
  }

  setSubRegion() {
    let tmpSubRegion: SubRegionData = this.subregions.find((val) => { return this.data.eGridSubregion === val.subregion; });
    if (tmpSubRegion) {
      this.data.totalEmissionOutputRate = tmpSubRegion.carbonFactor;
      this.data.carbonFactor = tmpSubRegion.carbonFactor;
      this.data.methaneFactor = tmpSubRegion.methaneFactor;
      this.data.nitrousFactor = tmpSubRegion.nitrousFactor;
      this.save();
    }
  }
  setMobileOptions() {
    let tmpMobile: MobileEmission = this.mobileEmissions.find((val) => { return this.data.energySource === val.energySource; });
    if (tmpMobile) {
      this.mobileOptions = tmpMobile.mobileTypes;
      let tmpMobileProperty: MobileTypeProperties = this.mobileOptions.find((val) => { return this.data.mobileType === val.mobileType; });
      if (tmpMobileProperty) {
        this.setMobile();
      } else {
        this.data.mobileType = undefined;
        this.data.totalEmissionOutputRate = undefined;
        this.data.methaneFactor = 0;
        this.data.nitrousFactor = 0;
        this.data.carbonFactor = 0;
        this.save();
      }
    }
  }
  setMobile() {
    let tmpMobile: MobileTypeProperties = this.mobileOptions.find((val) => { return this.data.mobileType === val.mobileType; });
    if (tmpMobile) {
      let convertedMobile: MobileTypeProperties = this.co2SavingsService.convertMobile(tmpMobile);
      this.data.carbonFactor = convertedMobile.carbonFactor;
      this.data.methaneFactor = convertedMobile.methaneFactor;
      this.data.nitrousFactor = convertedMobile.nitrousFactor;
    }
    if (this.energyUnits == 'MMBtu') {
      this.mobileUnits = tmpMobile.imperialUnit;
    } else {
      this.mobileUnits = tmpMobile.metricUnit;
    }
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
