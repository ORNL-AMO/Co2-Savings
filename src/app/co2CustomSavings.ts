export interface Custom {
    energySource: string;
    customType: CustomTypeProperties;
}

export interface CustomTypeProperties {
    carbonFactor?: number,
    methaneFactor?: number,
    nitrousFactor?: number,
    warmingPotential?: number,
    unit: string
}

export const customEmissions: Array<Custom> = [
    {
        energySource: 'Fuel',
        customType: 
            {
                carbonFactor: 0,
                methaneFactor: 0,
                nitrousFactor: 0,
                unit: 'MMBTU'
            }

    },
    {
        energySource: 'Electricity',
        customType: 
            {
                carbonFactor: 0,
                methaneFactor: 0,
                nitrousFactor: 0,
                unit: 'MWh'
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
                unit: 'units'
            }
        ,

    },
    {
        energySource: 'Fugitive',
        customType: 
            {
                warmingPotential: 0,
                unit: 'units'
            }
        ,

    },
];