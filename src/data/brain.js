const brain = {
    winConditions: [
        ['aa','bb','cc'],
        ['ac','bb','ca'],
        ['aa','ab','ac'],
        ['ba','bb','bc'],
        ['ca','cb','cc'],
        ['aa','ba','ca'],
        ['ab','bb','cb'],
        ['ac','bc','cc']
    ],
    cornerTraps: [
        {
            traps: [
                ['ba', 'ab'],
                ['ba', 'ac'],
                ['ab', 'ca']
            ],
            danger: 'cc'
        },
        {
            traps: [
                ['ab', 'bc'],
                ['ab', 'cc'],
                ['aa', 'bc']
            ],
            danger: 'ca'
        },
        {
            traps: [
                ['bc', 'cb'],
                ['cb', 'ac'],
                ['bc', 'ca']
            ],
            danger: 'aa'
        },
        {
            traps: [
                ['ba', 'cb'],
                ['aa', 'cb'],
                ['ba', 'cc']
            ],
            danger: 'ac'
        },
    ],
    grid: ['aa', 'ba', 'ca', 'ab', 'bb', 'cb', 'ac',  'bc', 'cc'],
    corners: ['aa','ca', 'cc', 'ac'],
    edges: ['ab', 'ba', 'bc', 'cb']
};

export default brain;