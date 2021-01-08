const { testMultiple } = require('../testUtils');

testMultiple(findIntersection, [
    {
        params: [
            ['abc']
        ],
        result: 3,
    },
    {
        params: [
            ['a', 'b', 'c']
        ],
        result: 0,
    },
    {
        params: [
            ['ab', 'ac']
        ],
        result: 1,
    },
    {
        params: [
            ['a', 'a', 'a', 'a']
        ],
        result: 1,
    },
    {
        params: [
            ['b']
        ],
        result: 1,
    },
], testPrefix='findIntersection');

function findIntersection(group) {
    let res = Array.from(group[0]);
    
    for (const p of group.slice(1)) {
        res = res.filter(val => p.includes(val));
    }
    
    return res.length;
}


function part2Solution(data) {
    const groupTotals = data.map(group => findIntersection(group.split('\r\n')));
    
    return groupTotals.reduce((a, b) => a + b, 0);
}

module.exports = part2Solution;