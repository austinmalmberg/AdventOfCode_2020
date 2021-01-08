const File = require('../fsUtils');
const { testOne } = require('../testUtils');

const SEARCH_KEY = 'shiny gold';

function runPartOneTests() {
    const exampleFile = new File('part1Example.txt');

    /* Bag input to object */
    const bagRules = bagRuleMap(exampleFile.lines());
    testOne(() => bagRules, ({
        'light red': { 'bright white': 1, 'muted yellow': 2 },
        'dark orange': { 'bright white': 3, 'muted yellow': 4 },
        'bright white': { 'shiny gold': 1 },
        'muted yellow': { 'shiny gold': 2, 'faded blue': 9 },
        'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
        'dark olive': { 'faded blue': 3, 'dotted black': 4 },
        'vibrant plum': { 'faded blue': 5, 'dotted black': 6 },
        'faded blue': {},
        'dotted black': {}
    }), testId='Mapping');
    
    /* test solution 1 on example */
    testOne(() => dfsMemo(bagRules, SEARCH_KEY), 4, testId='BagsContainingShinyGold');
}

function bagRuleMap(rules) {
    return rules.reduce((map, rule) => {
        const [parent, values] = rule.split(' bags contain ');
        
        return {
            ...map,
            [parent]: getChildrenObject(values)
        };
    }, {})
    
    function getChildrenObject(string) {
        if (string === 'no other bags.') return {};
        
        const children = string.match(/\d+\s\w+\s\w+/g);
        return children.reduce((obj, child) => {
            const [qty, bag] = child.split(/(?<=^\S+)\s/);
            return { ...obj, [bag]: Number(qty) };
        }, {});
    }
}

function dfsMemo(searchMap, searchKey) {
    const memo = {};
    
    for (const key of Object.keys(searchMap)) {
        memo[key] = dfs({ map: searchMap, key: searchKey }, key, memo);
    }
    
    return Object.values(memo).filter(val => val === true).length;
}

function dfs(search, lookupKey, memo) {
    if (lookupKey in memo) return memo[lookupKey];
    
    if (search.key in search.map[lookupKey])
        return true;
        
    for (const childKey of Object.keys(search.map[lookupKey])) {
        const res = dfs(search, childKey, memo);
        if (res) return true;
    }
    
    return false;
}

const file = new File('input.txt');
const bagRules = bagRuleMap(file.lines());

runPartOneTests();

/* Solution 1 */

const solutionOne = dfsMemo(bagRules, SEARCH_KEY);
console.log(solutionOne);


function runPartTwoTests() {
    const file = new File('part2Example1.txt');
    
    const bagRules = bagRuleMap(file.lines());
    testOne(() => bagRules[SEARCH_KEY], { 'dark red': 2 }, 'ShinyGoldContents');
    testOne(() => dfsTotal(bagRules, SEARCH_KEY), 126, 'SolutionTwoExample');
    
    const file2 = new File('part2Example2.txt');
    
    const bagRules2 = bagRuleMap(file2.lines());
    testOne(() => bagRules2[SEARCH_KEY], { 'dark olive': 1, 'vibrant plum': 2 }, 'ShinyGoldContents2');
    testOne(() => dfsTotal(bagRules2, SEARCH_KEY), 32, 'SolutionTwoExample2');
}


function dfsTotal(bagRules, key) {
    total = 0;
    
    for (const [childKey, childValue] of Object.entries(bagRules[key])) {
        total += childValue + childValue * dfsTotal(bagRules, childKey);
    }
    
    return total;
    
    // return Object.values(bag).reduce((total, val) => total + val, 0) * depth +
    //     Object.keys(bag).reduce((total, childKey) => total + dfs(map, map[childKey], memo, depth+1));
}

runPartTwoTests();

const solutionTwo = dfsTotal(bagRules, SEARCH_KEY);
console.log(solutionTwo);
