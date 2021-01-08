const File = require('../fsUtils');
const { testOne } = require('../testUtils');

function runTests() {
    const file = new File('example.txt');
    
    const arr = file.lines().map(line => Number(line));
    const WINDOW_LEN = 5;
    testOne(arr[2], 15, 'LoadPreamble')
    testOne(sumInWindow(arr, 40, 0, WINDOW_LEN), true, 'SumInPreamble');
    
    const answer1 = solutionOne(arr, WINDOW_LEN);
    testOne(answer1, 127, 'SolutionOneTest');
    
    testOne(solutionTwo(arr, WINDOW_LEN), 62, 'SolutionTwoTest');
}

function sumInWindow(arr, target, min, windowLength) {
    let s = new Set();
    for (let i = min; i < min + windowLength; i++) {
        const n = arr[i];
        
        if (s.has(n)) return true;
        
        s.add(target - n);
    }
    
    return false;
}

function solutionOne(arr, windowLength) {
    let i = windowLength;
    while (i < arr.length) {
        const target = arr[i];
        
        if (!sumInWindow(arr, target, min=i-windowLength, windowLength))
            return target;
        
        i++;
    }
    
    return null;
}

function solutionTwo(arr, windowLength) {
    
    const target = solutionOne(arr, windowLength);
    
    let l = 0;
    let r = 2;
    let sum = arr.slice(l, r).reduce((total, i) => total + i, 0);
    
    while (r < arr.length) {
        // expand window and increase sum
        while (sum < target) {
            sum += arr[r++];
        }
        
        // shrink window and decrease sum,
        // making sure not to shrink the window below length 2
        while (sum > target && r-l > 2) {
            sum -= arr[l++];
        }
        
        if (sum === target)
            break;
    }
    
    // find min and max of window
    let min = Math.min(arr[l], arr[l+1]);
    let max = Math.max(arr[l], arr[l+1]);
    
    for (let i = l + 2; i < r; i++) {
        const n = arr[i];
        
        if (n < min)
            min = n;
        else if (n > max)
            max = n;
    }
    
    return min + max;
}

runTests();

const file = new File('input.txt');

const PREAMBLE_LENGTH = 25;
const arr = file.lines().map(line => Number(line));

console.log('Solutions:', {
    one: solutionOne(arr, PREAMBLE_LENGTH),
    two: solutionTwo(arr, PREAMBLE_LENGTH)
});