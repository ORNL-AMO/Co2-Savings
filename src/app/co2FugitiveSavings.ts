export interface Fugitive {
    energySource: string;
    fugitiveTypes: Array<FugitiveTypeProperties>;
}

export interface FugitiveTypeProperties {
    fugitiveType: string,
    warmingPotential: number,
}

export const fugitives: Array<Fugitive> = [
    {
        energySource: 'Gas',
        fugitiveTypes: [
            {
                fugitiveType: 'N2O',
                warmingPotential: 298
            },
            {
                fugitiveType: 'HFC-23',
                warmingPotential: 14800
            },
            {
                fugitiveType: 'HFC-32',
                warmingPotential: 675
            },
            {
                fugitiveType: 'HFC-41',
                warmingPotential: 92
            },
            {
                fugitiveType: 'HFC-125',
                warmingPotential: 3500
            },
            {
                fugitiveType: 'HFC-134',
                warmingPotential: 1100
            },
            {
                fugitiveType: 'HFC-134a',
                warmingPotential: 1430
            },
            {
                fugitiveType: 'HFC-143',
                warmingPotential: 353
            },
            {
                fugitiveType: 'HFC-143a',
                warmingPotential: 4470
            },
            {
                fugitiveType: 'HFC-152',
                warmingPotential: 53
            },
            {
                fugitiveType: 'HFC-152a',
                warmingPotential: 124
            },
            {
                fugitiveType: 'HFC-161',
                warmingPotential: 12
            },
            {
                fugitiveType: 'HFC-227ea',
                warmingPotential: 3220
            },
            {
                fugitiveType: 'HFC-236cb',
                warmingPotential: 1340
            },
            {
                fugitiveType: 'HFC-236ea',
                warmingPotential: 1370
            },
            {
                fugitiveType: 'HFC-236fa',
                warmingPotential: 9810
            },
            {
                fugitiveType: 'HFC-245ca',
                warmingPotential: 693
            },
            {
                fugitiveType: 'HFC-245fa',
                warmingPotential: 1030
            },
            {
                fugitiveType: 'HFC-365mfc',
                warmingPotential: 794
            },
            {
                fugitiveType: 'HFC-43-10mee',
                warmingPotential: 1640
            },
            {
                fugitiveType: 'SF6',
                warmingPotential: 22800
            },
            {
                fugitiveType: 'NF3',
                warmingPotential: 17200
            },
            {
                fugitiveType: 'CF4',
                warmingPotential: 7390
            },
            {
                fugitiveType: 'C2F6',
                warmingPotential: 12200
            },
            {
                fugitiveType: 'C3F8',
                warmingPotential: 8830
            },
            {
                fugitiveType: 'c-C4F8',
                warmingPotential: 10300
            },
            {
                fugitiveType: 'C4F10',
                warmingPotential: 8860
            },
            {
                fugitiveType: 'C5F12',
                warmingPotential: 9160
            },
            {
                fugitiveType: 'C6F14',
                warmingPotential: 9300
            },
            {
                fugitiveType: 'C10F18',
                warmingPotential: 7500
            }
        ],

    },
    {
        energySource: 'Refrigerant',
        fugitiveTypes: [
            {
                fugitiveType: 'R-401A',
                warmingPotential: 16
            },
            {
                fugitiveType: 'R-401B',
                warmingPotential: 14
            },
            {
                fugitiveType: 'R-401C',
                warmingPotential: 19
            },
            {
                fugitiveType: 'R-402A',
                warmingPotential: 2100
            },
            {
                fugitiveType: 'R-402B',
                warmingPotential: 1330
            },
            {
                fugitiveType: 'R-403B',
                warmingPotential: 3444
            },
            {
                fugitiveType: 'R-404A',
                warmingPotential: 3922
            },
            {
                fugitiveType: 'R-406A',
                warmingPotential: 0
            },
            {
                fugitiveType: 'R-407A',
                warmingPotential: 2107
            },
            {
                fugitiveType: 'R-407B',
                warmingPotential: 2804
            },
            {
                fugitiveType: 'R-407C',
                warmingPotential: 1774
            },
            {
                fugitiveType: 'R-407D',
                warmingPotential: 1627
            },
            {
                fugitiveType: 'R-407E',
                warmingPotential: 1552
            },
            {
                fugitiveType: 'R-408A',
                warmingPotential: 2301
            },
            {
                fugitiveType: 'R-409A',
                warmingPotential: 0
            },
            {
                fugitiveType: 'R-410A',
                warmingPotential: 2088
            },
            {
                fugitiveType: 'R-410B',
                warmingPotential: 2229
            },
            {
                fugitiveType: 'R-411A',
                warmingPotential: 14
            },
            {
                fugitiveType: 'R-411B',
                warmingPotential: 4
            },
            {
                fugitiveType: 'R-413A',
                warmingPotential: 2053
            },
            {
                fugitiveType: 'R-414A',
                warmingPotential: 0
            },
            {
                fugitiveType: 'R-414B',
                warmingPotential: 0
            },
            {
                fugitiveType: 'R-417A',
                warmingPotential: 2346
            },
            {
                fugitiveType: 'R-422A',
                warmingPotential: 3143
            },
            {
                fugitiveType: 'R-422D',
                warmingPotential: 2729
            },
            {
                fugitiveType: 'R-423A',
                warmingPotential: 2280
            },
            {
                fugitiveType: 'R-424A',
                warmingPotential: 2440
            },
            {
                fugitiveType: 'R-426A',
                warmingPotential: 1508
            },
            {
                fugitiveType: 'R-428A',
                warmingPotential: 3607
            },
            {
                fugitiveType: 'R-434A',
                warmingPotential: 3245
            },
            {
                fugitiveType: 'R-500',
                warmingPotential: 32
            },
            {
                fugitiveType: 'R-502',
                warmingPotential: 0
            },
            {
                fugitiveType: 'R-504',
                warmingPotential: 325
            },
            {
                fugitiveType: 'R-507',
                warmingPotential: 3985
            },
            {
                fugitiveType: 'R-508A',
                warmingPotential: 13214
            },
            {
                fugitiveType: 'R-508B',
                warmingPotential: 13396
            },
        ]
    }
];
