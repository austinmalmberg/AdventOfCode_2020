const { testMultiple } = require('../testUtils');

testMultiple(findUnion, [
    {
        params: [
            ['abc']
        ],
        result: 3
    },
    {
        params: [
            ['a', 'b', 'c']
        ],
        result: 3
    },
    {
        params: [
            ['ab', 'ac']
        ],
        result: 3
    },
    {
        params: [
            ['a', 'a', 'a', 'a']
        ],
        result: 1
    },
    {
        params: [
            ['b']
        ],
        result: 1
    },
], testPrefix='findUnion');

function findUnion(group) {
    let charSet = new Set();
    
    for (const p of group) {
        [...p].forEach(ch => charSet.add(ch));
    }
    
    return charSet.size;
}

function part1Solution(data) {
    const groupTotals = data.map(group => findUnion(group.split('\r\n')));
    
    return groupTotals.reduce((a, b) => a + b, 0);
}

module.exports = part1Solution;
