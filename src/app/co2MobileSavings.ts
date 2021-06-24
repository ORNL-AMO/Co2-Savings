export interface MobileEmission {
    energySource: string;
    mobileTypes: Array<MobileTypeProperties>;
}

export interface MobileTypeProperties {
    mobileType: string,
    carbonFactor: number,
    methaneFactor: number,
    nitrousFactor: number,
    imperialUnit: string
    metricUnit: string
}

export const mobileEmissions: Array<MobileEmission> = [
    {
        energySource: 'Personal Vehicles',
        mobileTypes: [
            {
                mobileType: 'Motor Gasoline',
                carbonFactor: 8.78,
                methaneFactor: 0.38,
                nitrousFactor: 0.08,
                imperialUnit: 'gal',
                metricUnit: 'L'
            },
            {
                mobileType: 'Diesel',
                carbonFactor: 10.21,
                methaneFactor: 0.41,
                nitrousFactor: 0.08,
                imperialUnit: 'gal',
                metricUnit: 'L'
            },
            {
                mobileType: 'Biodiesel (100%)',
                carbonFactor: 9.45,
                methaneFactor: 0.14,
                nitrousFactor: 0.01,
                imperialUnit: 'gal',
                metricUnit: 'L'
            },
            {
                mobileType: 'Ethanol (100%)',
                carbonFactor: 5.75,
                methaneFactor: 0.09,
                nitrousFactor: 0.01,
                imperialUnit: 'gal',
                metricUnit: 'L'
            },
            {
                mobileType: 'Compressed Natural Gas (CNG)',
                carbonFactor: 0.05444,
                methaneFactor: 0.00103,
                nitrousFactor: 0.0001,
                imperialUnit: 'scf',
                metricUnit: 'Nm3'
            },
            {
                mobileType: 'Liquefied Petroleum Gases (LPG)',
                carbonFactor: 5.68,
                methaneFactor: 0.28,
                nitrousFactor: 0.06,
                imperialUnit: 'gal',
                metricUnit: 'L'
            },
            {
                mobileType: 'Residual Fuel Oil No. 6',
                carbonFactor: 11.27,
                methaneFactor: 0.45,
                nitrousFactor: 0.09,
                imperialUnit: 'gal',
                metricUnit: 'L'
            }
        ]

    },
    {
        energySource: 'Commuter Vehicles',
        mobileTypes: [
            {
                mobileType: 'Passenger Car',
                carbonFactor: 0.335,
                methaneFactor: 0.009,
                nitrousFactor: 0.008,
                imperialUnit: 'vehicle-mile',
                metricUnit: 'vehicle-km'
            },
            {
                mobileType: 'Light-Duty Truck',
                carbonFactor: 0.461,
                methaneFactor: 0.012,
                nitrousFactor: 0.010,
                imperialUnit: 'vehicle-mile',
                metricUnit: 'vehicle-km'
            },
            {
                mobileType: 'Motorcycle',
                carbonFactor: 0.184,
                methaneFactor: 0.070,
                nitrousFactor: 0.007,
                imperialUnit: 'vehicle-mile',
                metricUnit: 'vehicle-km'
            },
            {
                mobileType: 'Intercity Rail - Northeast Corridor',
                carbonFactor: 0.058,
                methaneFactor: 0.0055,
                nitrousFactor: 0.0007,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Intercity Rail - Other Routes',
                carbonFactor: 0.150,
                methaneFactor: 0.0117,
                nitrousFactor: 0.0038,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Intercity Rail - National Average',
                carbonFactor: 0.113,
                methaneFactor: 0.0092,
                nitrousFactor: 0.0026,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Commuter Rail',
                carbonFactor: 0.148,
                methaneFactor: 0.0123,
                nitrousFactor: 0.0030,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Transit Rail (i.e. Subway, Tram)',
                carbonFactor: 0.099,
                methaneFactor: 0.0089,
                nitrousFactor: 0.0013,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Bus',
                carbonFactor: 0.053,
                methaneFactor: 0.0206,
                nitrousFactor: 0.0009,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Air Travel (<300 miles)',
                carbonFactor: 0.215,
                methaneFactor: 0.0077,
                nitrousFactor: 0.0068,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Air Travel (300-2300 miles)',
                carbonFactor: 0.133,
                methaneFactor: 0.0006,
                nitrousFactor: 0.0042,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            },
            {
                mobileType: 'Air Travel (>=2300 miles)',
                carbonFactor: 0.165,
                methaneFactor: 0.0006,
                nitrousFactor: 0.0052,
                imperialUnit: 'passenger-mile',
                metricUnit: 'passenger-km'
            }
        ]
    },
    {
        energySource: 'Transportation',
        mobileTypes: [
            {
                mobileType: 'Medium and Heavy-Duty Truck',
                carbonFactor: 0.207,
                methaneFactor: 0.002,
                nitrousFactor: 0.0046,
                imperialUnit: 'ton-mile',
                metricUnit: 'tonne-km'
            },
            {
                mobileType: 'Rail',
                carbonFactor: 0.021,
                methaneFactor: 0.0017,
                nitrousFactor: 0.0005,
                imperialUnit: 'ton-mile',
                metricUnit: 'tonne-km'
            },
            {
                mobileType: 'Waterborne Craft',
                carbonFactor: 0.04,
                methaneFactor: 0.0122,
                nitrousFactor: 0.0017,
                imperialUnit: 'ton-mile',
                metricUnit: 'tonne-km'
            },
            {
                mobileType: 'Aircraft',
                carbonFactor: 1.265,
                methaneFactor: 0,
                nitrousFactor: 0.0389,
                imperialUnit: 'ton-mile',
                metricUnit: 'tonne-km'
            }
        ]
    }

];
