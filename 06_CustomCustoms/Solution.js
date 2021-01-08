const File = require('../fsUtils');

const part1Solution = require('./partOne.js');
const part2Solution = require('./partTwo.js');

const file = new File('input.txt');
const formattedData = file.data().split('\r\n\r\n');

console.log('Part 1:', part1Solution(formattedData));
console.log('Part 2:', part2Solution(formattedData));
