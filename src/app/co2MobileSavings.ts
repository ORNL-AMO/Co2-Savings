export interface MobileEmission {
    energySource: string;
    mobileTypes: Array<MobileTypeProperties>;
}

export interface MobileTypeProperties {
    fuelType: string,
    carbonFactor: number,
    methaneFactor: number,
    nitrousFactor: number,
}

export const mobileEmissions: Array<MobileEmission> = [
    {
        energySource: 'Personal Vehicles',
        mobileTypes: [
            {
                fuelType: 'Motor Gasoline',
                carbonFactor: 8.78,
                methaneFactor: 0.38,
                nitrousFactor: 0.08,
            },
            {
                fuelType: 'Diesel',
                carbonFactor: 10.21,
                methaneFactor: 0.41,
                nitrousFactor: 0.08,
            },
            {
                fuelType: 'Biodiesel (100%)',
                carbonFactor: 9.45,
                methaneFactor: 0.14,
                nitrousFactor: 0.01,
            },
            {
                fuelType: 'Ethanol (100%)',
                carbonFactor: 5.75,
                methaneFactor: 0.09,
                nitrousFactor: 0.01,
            },
            {
                fuelType: 'Compressed Natural Gas (CNG)',
                carbonFactor: 0.05444,
                methaneFactor: 0.00103,
                nitrousFactor: 0.0001,
            },
            {
                fuelType: 'Liquefied Petroleum Gases (LPG)',
                carbonFactor: 5.68,
                methaneFactor: 0.28,
                nitrousFactor: 0.06,
            },
            {
                fuelType: 'Residual Fuel Oil No. 6',
                carbonFactor: 11.27,
                methaneFactor: 0.45,
                nitrousFactor: 0.09,
            }
        ]

    },
    {
        energySource: 'Commuter Vehicles',
        mobileTypes: [
            {
                fuelType: 'Passenger Car',
                carbonFactor: 0.335,
                methaneFactor: 0.009,
                nitrousFactor: 0.008,
            },
            {
                fuelType: 'Light-Duty Truck',
                carbonFactor: 0.461,
                methaneFactor: 0.012,
                nitrousFactor: 0.010,
            },
            {
                fuelType: 'Motorcycle',
                carbonFactor: 0.184,
                methaneFactor: 0.070,
                nitrousFactor: 0.007,
            },
            {
                fuelType: 'Intercity Rail - Northeast Corridor',
                carbonFactor: 0.058,
                methaneFactor: 0.0055,
                nitrousFactor: 0.0007,
            },
            {
                fuelType: 'Intercity Rail - Other Routes',
                carbonFactor: 0.150,
                methaneFactor: 0.0117,
                nitrousFactor: 0.0038,
            },
            {
                fuelType: 'Intercity Rail - National Average',
                carbonFactor: 0.113,
                methaneFactor: 0.0092,
                nitrousFactor: 0.0026,
            },
            {
                fuelType: 'Commuter Rail',
                carbonFactor: 0.148,
                methaneFactor: 0.0123,
                nitrousFactor: 0.0030,
            },
            {
                fuelType: 'Transit Rail (i.e. Subway, Tram)',
                carbonFactor: 0.099,
                methaneFactor: 0.0089,
                nitrousFactor: 0.0013,
            },
            {
                fuelType: 'Bus',
                carbonFactor: 0.053,
                methaneFactor: 0.0206,
                nitrousFactor: 0.0009,
            },
            {
                fuelType: 'Air Travel (<300 miles)',
                carbonFactor: 0.215,
                methaneFactor: 0.0077,
                nitrousFactor: 0.0068,
            },
            {
                fuelType: 'Air Travel (300-2300 miles)',
                carbonFactor: 0.133,
                methaneFactor: 0.0006,
                nitrousFactor: 0.0042,
            },
            {
                fuelType: 'Air Travel (>=2300 miles)',
                carbonFactor: 0.165,
                methaneFactor: 0.0006,
                nitrousFactor: 0.0052,
            }
        ]
    },
    {
        energySource: 'Transportation',
        mobileTypes: [
            {
                fuelType: 'Medium and Heavy-Duty Truck',
                carbonFactor: 0.207,
                methaneFactor: 0.002,
                nitrousFactor: 0.0046,
            },
            {
                fuelType: 'Rail',
                carbonFactor: 0.021,
                methaneFactor: 0.0017,
                nitrousFactor: 0.0005,
            },
            {
                fuelType: 'Waterborne Craft',
                carbonFactor: 0.04,
                methaneFactor: 0.0122,
                nitrousFactor: 0.0017,
            },
            {
                fuelType: 'Aircraft',
                carbonFactor: 1.265,
                methaneFactor: 0,
                nitrousFactor: 0.0389,
            }
        ]
    }

];
