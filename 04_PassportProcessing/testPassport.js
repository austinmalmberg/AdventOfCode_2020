const File = require('../fsUtils');
const { batchFileDataTest } = require('../testUtils');

const FIELD = Object.freeze({
    BIRTH_YEAR: 'byr',
    ISSUE_YEAR: 'iyr',
    EXPIRATION_YEAR: 'eyr',
    HEIGHT: 'hgt',
    HAIR_COLOR: 'hcl',
    EYE_COLOR: 'ecl',
    PASSPORT_ID: 'pid',
    COUNTRY_ID: 'cid'
})

const STRATEGY = Object.freeze({
    [FIELD.BIRTH_YEAR]: {
        required: true,
        tests: [
            (value) => /^\d{4}$/.test(value),
            (value) => {
                const n = Number(value);
                return n >= 1920 && n <= 2002
            }
        ],
    },
    [FIELD.ISSUE_YEAR]: {
        required: true,
        tests: [
            (value) => /^\d{4}$/.test(value),
            (value) => {
                const n = Number(value);
                return n >= 2010 && n <= 2020;
            },
        ],
    },
    [FIELD.EXPIRATION_YEAR]: {
        required: true,
        tests: [
            (value) => /^\d{4}$/.test(value),
            (value) => {
                const n = Number(value);
                return n >= 2020 && n <= 2030
            },
        ],
    },
    [FIELD.HEIGHT]: {
        required: true,
        tests: [
            // test that the value is a number followed by either 'cm' or 'in'
            (value) => /^\d+(cm|in)$/.test(value),
            
            // test heigth falls within min/max
            (value) => {
                const n = value.match(/\d+/g)[0];
                if (value.endsWith('cm'))
                    return n >= 150 && n <= 193;
                return n >= 59 && n <= 76;
            },
        ],
    },
    [FIELD.HAIR_COLOR]: {
        required: true,
        tests: [
            // test that the color is in the format matching #ffffff, where f can range from 0-9 or a-f
            (value) => /^#[0-9a-f]{6}$/.test(value),
        ],
    },
    [FIELD.EYE_COLOR]: {
        required: true,
        tests: [
            (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
        ],
    },
    [FIELD.PASSPORT_ID]: {
        required: true,
        tests: [
            (value) => /^\d{9}$/.test(value)
        ]
    },
    [FIELD.COUNTRY_ID]: {
        required: false,
        test: []
    },
});

/* TESTS */

batchFileDataTest(evaluateSolution, 'data', [
    ['example.txt', 2],
    ['invalidPassports.txt', 0],
    ['validPassports.txt', 4],
]);


/* CHALLENGE RESULT */

const file = new File('input.txt');
const res = evaluateSolution(file.data());
console.log(res);

function evaluateSolution(data) {
    const passports = getPassportsFromData(data);
    
    const validPassports = passports.filter(isValidPassport);
    
    return validPassports.length;
}

function isValidPassport(passport) {
    for (const [fieldName, fieldObj] of Object.entries(STRATEGY)) {
        const value = passport[fieldName];
        
        if (fieldObj.required && !value) return false;
        
        if (fieldObj.tests && !fieldObj.tests.every(test => test(value)))
            return false;
    }
    
    return true;
}

function getPassportsFromData(data) {
    
    const formattedData = data.split('\r\n\r\n');
    
    const passports = formattedData.reduce((arr, entry) => {
        const kvPairs = entry.split(/[(\r\n)+\s+]+/g);
        const obj = kvPairs.reduce((map, kv) => {
            const [key, value] = kv.split(':');
            return {
                ...map,
                [key]: value
            };
        }, {});
        return [...arr, obj];
    }, []);
    
    return passports;
}
