const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
	if (err) throw err;

	const arr = data.split('\n').map(line => Number(line));
	const res = findSumPair(2020, arr);
	console.log(
		res.reduce((a, b) => a * b, 1)
	);
});

/*
  Iterates over the array and finds two numbers whose sum equals the target
  then returns them in a resultant array.  Returns an empty array if no
  numbers equals the target.
*/
function findSumPair(target, arr) {
	const matches = new Set();

	for (const n of arr) {
		const match = target - n;
		if (matches.has(n)) return [n, match];

		matches.add(match);
	}

	return [];
}