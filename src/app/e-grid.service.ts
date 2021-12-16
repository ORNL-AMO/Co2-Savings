import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EGridService {
  zipCodeLookup;
  allZipcodesMapped: Array<any>;
  subRegionsByZipcode: Array<SubRegionData>;
  co2Emissions: Array<SubregionEmissions>;

  constructor() {}
  
  getAllSubRegions() {
    Papa.parse("assets/eGRID-co2-emissions.csv", {
      header: true,
      download: true,
      complete: results => {
        this.setCo2Emissions(results.data);
      }
    });

    Papa.parse("assets/eGrid_zipcode_lookup.csv", {
      header: true,
      download: true,
      complete: results => {
        this.setSubRegionsByZip(results.data);
      }
    });
  }

  setSubRegionsByZip(csvResults: Array<any>) {
    let subRegionsByZipcode = new Array<SubRegionData>();
    csvResults.forEach(result => {
      if (result['ZIP (character)']) {
          subRegionsByZipcode.push({
            zip: result['ZIP (character)'],
            state: result['state'],
            subregions: [
              result['eGRID Subregion #1'],
              result['eGRID Subregion #2'],
              result['eGRID Subregion #3'],
            ]
          });
      }
    });

    this.subRegionsByZipcode = subRegionsByZipcode;
  }
  

  setCo2Emissions(csvResults: Array<any>) {
    let co2Emissions = new Array<SubregionEmissions>();
    csvResults.forEach(result => {
      if (result['eGRID Subregion']) {
        co2Emissions.push({
            subregion: result['eGRID Subregion'],
            co2Factor: Number(result['CO2 Factor']),
            chFactor: Number(result['CH4 Factor']),
            n2OFactor: Number(result['N2O Factor']),
          })
      }
    });

    this.co2Emissions = co2Emissions;
  }

  findEGRIDCO2Emissions(eGridSubregion: string): SubregionEmissions {
    return  _.find(this.co2Emissions, (val) => val.subregion.includes(eGridSubregion));
  }

}

export interface SubRegionData {
  zip: string,
  state: string,
  co2Emissions?: number,
  subregions?: Array<string>,
  carbonFactor?: number,
  methaneFactor?: number,
  nitrousFactor?: number
}

export interface SubregionEmissions {
  subregion: string, 
  co2Factor: number,
  chFactor: number,
  n2OFactor: number,
}
