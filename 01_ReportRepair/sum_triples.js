const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
	if (err) throw err;

	const arr = data.split('\n').map(line => Number(line));
	console.log("Sum Pair: " +
		findSumPair(2020, arr).reduce((a, b) => a * b, 1)
	);

	console.log("Sum Triple: " +
		findSumTriple(2020, arr).reduce((a, b) => a * b, 1)
	);
});

/*
  Iterates over the array and finds three numbers whose sum equals the target
  then returns them in a resultant array.  Returns an empty array if no
  numbers equals the target.
*/
function findSumPair(target, arr) {
	const matches = new Set();

	for (const n of arr) {
		const partner = target - n;
		if (matches.has(n)) return [n, partner];

		matches.add(partner);
	}

	return [];
}

function findSumTriple(target, arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		const n = arr[i];

		const partners = findSumPair(2020 - n, arr.slice(i + 1));
		if (partners.length > 0) {
			partners.push(n);
			return partners;
		}
	}

	return [];
}