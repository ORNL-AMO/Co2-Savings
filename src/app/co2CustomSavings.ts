export interface Custom {
    energySource: string;
    customType: CustomTypeProperties;
}

export interface CustomTypeProperties {
    carbonFactor?: number,
    methaneFactor?: number,
    nitrousFactor?: number,
    warmingPotential?: number,
    imperialUnit: string,
    metricUnit: string
}

export const customEmissions: Array<Custom> = [
    {
        energySource: 'Fuel',
        customType: 
            {
                carbonFactor: 0,
                methaneFactor: 0,
                nitrousFactor: 0,
                imperialUnit: 'MMBTU',
                metricUnit: 'GJ'
            }

    },
    {
        energySource: 'Electricity',
        customType: 
            {
                carbonFactor: 0,
                methaneFactor: 0,
                nitrousFactor: 0,
                imperialUnit: 'MWh',
                metricUnit: 'MWh'
            }
        ,

    },
    {
        energySource: 'Mobile',
        customType: 
            {
                carbonFactor: 0,
                methaneFactor: 0,
                nitrousFactor: 0,
                imperialUnit: 'units',
                metricUnit: 'units'
            }
        ,

    },
    {
        energySource: 'Fugitive',
        customType: 
            {
                warmingPotential: 0,
                imperialUnit: 'lbs',
                metricUnit: 'kg'
            }
        ,

    },
];