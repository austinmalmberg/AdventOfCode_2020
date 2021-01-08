const File = require('../fsUtils');
const { testOne } = require('../testUtils');

function runTests() {
    testOne(solutionOne(new File('example1.txt').lines()), 35, 'Example1-1');
    testOne(solutionOne(new File('example2.txt').lines()), 220, 'Example2-1');
    
    testOne(solutionTwo(new File('example1.txt').lines()), 8, 'Example1-2');
    testOne(solutionTwo(new File('example2.txt').lines()), 19208, 'Example2-2');
}

runTests();

function solutionOne(lines) {
    let arr = lines.map(line => Number(line));
    
    arr.sort((a, b) => a - b);
    
    // prepend 0 to acocunt for outlet adapter
    // append max+3 to account for device adapter
    arr = [0, ...arr, arr[arr.length - 1] + 3];
    
    const joltIncreases = [0, 0, 0];
    
    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];
        joltIncreases[diff-1]++;
    }
    
    return joltIncreases[0] * (joltIncreases[2]);
}

function solutionTwo(lines) {
    let arr = lines.map(line => Number(line));
    
    arr.sort((a, b) => a - b);
    
    // prepend 0 to acocunt for outlet adapter
    // append max+3 to account for device adapter
    arr = [0, ...arr, arr[arr.length - 1] + 3];
    
    const derivedArr = [...Array(arr.length).keys()].fill(0);
    
    for (let i = arr.length - 1; i >= 0; i--) {
        if (i === arr.length - 1) {
            derivedArr[i] = 1;
            continue;
        }
    
        let j = 1;
        while (j < arr.length && arr[i + j] - arr[i] <= 3) {
            derivedArr[i] += derivedArr[i + j];
            j++;
        }
    }
    
    return derivedArr[0];
}

const file = new File('input.txt');
const lines = file.lines();

console.log('Solutions:', {
    one: solutionOne(lines),
    two: solutionTwo(lines),
});
