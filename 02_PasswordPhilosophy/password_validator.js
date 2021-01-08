const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
	if (err) throw err;

	const lines = data.split('\n');

	// split the data with a regex to get it in the correct format
	const passwordEntries = lines.map(line => line.split(/[\-\s+\:]+/, 4));
	const validPasswords = passwordEntries.filter(isValidPassword);
	
	console.log(validPasswords.length);
});

function isValidPassword([min, max, ch, password]) {
	if (typeof min === "string") min = Number(min);
	if (typeof max === "string") max = Number(max);

	const regex = new RegExp(`[^${ch}]+`, 'g');
	const chCount = password.replace(regex, '').length;	

	return chCount >= min && chCount <= max;
}