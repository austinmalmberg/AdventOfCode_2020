const File = require('../fsUtils');

const file = new File('input.txt');

const formatted = file.lines().map(line => line.split(/[\-\s+\:]+/g, 4));
const validPasswords = formatted.filter(isValidPassword);

console.log(validPasswords.length);

function isValidPassword([min, max, ch, password]) {
    if (typeof min === "string") min = Number(min);
    if (typeof max === "string") max = Number(max);

    const first = password[min - 1];
    const second = password[max - 1];

    if (first === ch && second === ch)
        return false;

    return first === ch || second === ch;
}
