const File = require('../fsUtils');
const TestUtils = require('../testUtils');

/* FS UTILS */

const file = new File('test.txt');
console.log(file.data());
console.log(`${file.lines().length} in ${file.filename}.`);


/* TEST UTILS */

TestUtils.testFileData('test.txt', 'data', (data) => data.split('\r\n').length, 2, testId='data');
TestUtils.testFileData('test.txt', 'lines', (lines) => lines.length, 2, testId='lines');

TestUtils.batchFileDataTest(lines => lines[1], 'lines', [
    ['test.txt', 'And this is the second line.'],
]);

TestUtils.testOne(() => 2, 2, testId='equalsTwo');
TestUtils.testOne(() => 'cat', 'cat', testId='equalsCat');

TestUtils.testMultiple((a, b) => a + b, [
    {
        params: [2, 3],
        result: 5,
    },
    {
        params: ['hel', 'lo'],
        result: 'hello',
    },
], testPrefix='multiple');