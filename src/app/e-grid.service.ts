import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class EGridService {
  zipCodeLookup;
  allZipcodesMapped: Array<any>;
  subRegionsByZipcode: Array<SubRegionData>;
  co2Emissions: Array<SubregionEmissions>;

  constructor() {}

  findEGRIDCO2Emissions(eGridSubregion: string): SubregionEmissions {
    return  _.find(this.co2Emissions, (val) => val.subregion.includes(eGridSubregion));
  }


  async parseEGridData() {
    await fetch('assets/eGrid_zipcode_lookup.xlsx')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        let wb: XLSX.WorkBook = XLSX.read(new Uint8Array(buffer), { type: "array", raw: false });
        //zip code regions
        // [0: "ZIP (character)"
        // 1: "ZIP (numeric)"
        // 2: "state"
        // 3: "eGRID Subregion #1"
        // 4: "eGRID Subregion #2"
        // 5: "eGRID Subregion #3"]
        let sheetOne = XLSX.utils.sheet_to_json(wb.Sheets["eGrid_zipcode_lookup"], { raw: false });
        this.setSubRegionsByZip(sheetOne)
        //eGrid data
        //0: SUBRGN
        //1: YEAR
        //2: CATEGORY
        //3: CO2e
        let sheetTwo = XLSX.utils.sheet_to_json(wb.Sheets["eGrid_co2"], { raw: false });
        this.setCo2Emissions(sheetTwo);
      });
  }

  setSubRegionsByZip(fileData: Array<any>) {
    let subRegionsByZipcode = new Array<SubRegionData>();
    fileData.forEach(result => {
      if (result['ZIP (character)']) {
        subRegionsByZipcode.push({
          zip: result['ZIP (character)'],
          state: result['state'],
          subregions: [
            result['eGRID Subregion #1'],
            result['eGRID Subregion #2'],
            result['eGRID Subregion #3'],
          ]
        })
      }
    });
    this.subRegionsByZipcode = subRegionsByZipcode;
  }


  setCo2Emissions(csvResults: Array<any>) {
    let subregionEmissions = new Array<SubregionEmissions>();
    csvResults.forEach(result => {
      let subregion: string = result['SUBRGN'];
      if (subregion) {
        let co2Emissions: number = Number(result['CO2e']);
        let year: number = Number(result['YEAR']);
        let category: 'LocationMix' | 'ResidualMix' = result['CATEGORY'];
        subregionEmissions = this.addEmissionRate(subregion, co2Emissions, year, category, subregionEmissions);
      }
    });

    this.co2Emissions = subregionEmissions;
  }

  addEmissionRate(subregion: string, co2Emissions: number, year: number, category: 'LocationMix' | 'ResidualMix', subregionEmissions: Array<SubregionEmissions>): Array<SubregionEmissions> {
    let subregionIndex: number = subregionEmissions.findIndex(sEmissions => { return sEmissions.subregion == subregion });
    if (subregionIndex != -1) {
      if (category == 'LocationMix') {
        subregionEmissions[subregionIndex].locationEmissionRates.push({
          year: year,
          display: `${year} Location Rate`,
          co2Emissions: co2Emissions
        })
      } else {
        subregionEmissions[subregionIndex].residualEmissionRates.push({
          year: year,
          display: `${year} Residual Rate`,
          co2Emissions: co2Emissions
        })
      }
    } else {
      if (category == 'LocationMix') {
        subregionEmissions.push({
          subregion: subregion,
          locationEmissionRates: [{
            year: year,
            display: `${year} Location Rate`,
            co2Emissions: co2Emissions
          }],
          residualEmissionRates: new Array()
        })
      } else {
        subregionEmissions.push({
          subregion: subregion,
          locationEmissionRates: new Array(),
          residualEmissionRates: [{
            year: year,
            display: `${year} Residual Rate`,
            co2Emissions: co2Emissions
          }]
        })
      }
    }

    if (subregionEmissions[subregionIndex]) {
      subregionEmissions[subregionIndex].residualEmissionRates = _.orderBy(subregionEmissions[subregionIndex].residualEmissionRates, emissionRate => emissionRate.year);
      subregionEmissions[subregionIndex].locationEmissionRates = _.orderBy(subregionEmissions[subregionIndex].locationEmissionRates, emissionRate => emissionRate.year);
    }
    return subregionEmissions;
  }


  getEmissionsRate(subregion: string, year: number): { marketRate: number, locationRate: number } {
    let subregionEmissions: SubregionEmissions = this.co2Emissions.find(emissions => { return emissions.subregion == subregion });
    if (subregionEmissions) {
      let marketRate: number = 0;
      let locationRate: number = 0;
      if (subregionEmissions.locationEmissionRates.length != 0) {
        let closestYearRate: { co2Emissions: number, year: number } = _.minBy(subregionEmissions.locationEmissionRates, (emissionRate: { co2Emissions: number, year: number }) => {
          return Math.abs(emissionRate.year - year);
        });
        locationRate = closestYearRate.co2Emissions;
      }
      if (subregionEmissions.residualEmissionRates.length != 0) {
        let closestYearRate: { co2Emissions: number, year: number } = _.minBy(subregionEmissions.residualEmissionRates, (emissionRate: { co2Emissions: number, year: number }) => {
          return Math.abs(emissionRate.year - year);
        });
        marketRate = closestYearRate.co2Emissions;
      }
      return { marketRate: marketRate, locationRate: locationRate };
    }
    return { marketRate: 0, locationRate: 0 };
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
  locationEmissionRates: Array<MarketYearEmissions>,
  residualEmissionRates: Array<MarketYearEmissions>,
  co2Factor?: number,
  chFactor?: number,
  n2OFactor?: number,
}


export interface MarketYearEmissions { display: string, co2Emissions: number, year: number }
