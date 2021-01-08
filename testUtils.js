const _ = require('lodash')

const File = require('./fsUtils');

function testFileData(filename, readMethod, testFunc, expectedResult, testId=undefined) {
	
	const file = new File(filename);
	
	let data;
	switch(readMethod) {
		case 'data':
			data = file.data();
			break;
		case 'lines':
			data = file.lines();
			break;
		default:
			throw new Error('Invalid readMethod type: ' + readMethod);
	}
	
	testOne(() => testFunc(data), expectedResult, testId);
}


function batchFileDataTest(testFunc, readMethod, tests) {
	for (let i = 0; i < tests.length; i++) {
		const [filename, expectedResult] = tests[i];
		
		testFileData(filename, readMethod, testFunc, expectedResult, testId=i+1);
	}
}


function testOne(testFunc, expectedResult, testId=undefined, testPrefix=undefined) {
	
	let heading = testId ? `Test ${testId}` : 'Test';
	if (testPrefix) heading = `(${testPrefix}) ${heading}`;
	
	const testResult = typeof testFunc === "function" ? testFunc(): testFunc;
	
	if (!_.isEqual(testResult, expectedResult)) {
		console.log(`${heading} - FAILED\n\n\tActual: ${JSON.stringify(testResult)}\n\tExpected: ${JSON.stringify(expectedResult)}\n`);
		process.exit();
	}
		
	console.log(`${heading} - PASSED`);
	return true;
}


function testMultiple(testFunc, tests, testPrefix=undefined) {
	for (let i = 0; i < tests.length; i++) {
		const { params, result } = tests[i];
		
		testOne(() => testFunc(...params), result, testId=i+1, testPrefix=testPrefix);
	}
}

module.exports = { testFileData, batchFileDataTest, testOne, testMultiple };
