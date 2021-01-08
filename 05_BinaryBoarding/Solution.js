const File = require('../fsUtils');
const { testOne, testMultiple } = require('../testUtils');

const PLANE = {
    ROWS: 127,
    COLS: 7
}

const PARTITION_CHAR = Object.freeze({
    F: ([min, max]) => [min, min + Math.floor((max - min) / 2)],
    B: ([min, max]) => [min + 1 + Math.floor((max - min) / 2), max],
    
    L: ([min, max]) => [min, min + Math.floor((max - min) / 2)],
    R: ([min, max]) => [min + 1 + Math.floor((max - min) / 2), max],
});


testOne(() => getRowNumber('FBFBBFFRLR'), 44, testId='ROW');
testOne(() => getColNumber('RLR'), 5, testId='COL');

testMultiple(getSeatId, [
    {
        params: ['FBFBBFFRLR'],
        result: 357
    },
    {
        params: ['BFFFBBFRRR'],
        result: 567,
    },
    {
        params: ['FFFBBBFRRR'],
        result: 119,
    },
    {
        params: ['BBFFBBFRLL'], 
        result: 820,
    },
]);


function getSeatId(boardingPass) {
    const rSub = boardingPass.substring(0, 7);
    const cSub = boardingPass.substring(7);
    
    return getRowNumber(rSub) * 8 + getColNumber(cSub);
}

const file = new File('input.txt');
partOneSolution(file.lines());
partTwoSolution(file.lines());

function partOneSolution(lines) {
    let max = Number.MIN_SAFE_INTEGER;
    lines.forEach(line => {
        const seatId = getSeatId(line);
        if (max < seatId) max = seatId;
    });
    
    console.log('Part 1 solution:', max);
}

function partTwoSolution(lines) {
    const range = [...Array(PLANE.ROWS * 8 + PLANE.COLS).keys()];
    const seats = new Set(range);
    
    lines.forEach(line => {
        const seatId = getSeatId(line);
        seats.delete(seatId);
    });
    
    // as stated in the challenge, seatIds in range [0, i] and [j, PLANE.ROWS]
    // do not exist on our particular plane where i and j are the first and
    // last seat.  Furthermore, i and j is not our seat so ours will be the only
    // non-consecutive seat
    
    const filterOuterSeatIds = function(remainingSeats) {
        return Array.from(remainingSeats).filter(seatId => {
            if (seatId === 0 || seatId === range[range.length - 1])
                return false;
            if (remainingSeats.has(seatId - 1) || remainingSeats.has(seatId + 1))
                return false;
                
            return true;
        });
    };
    
    console.log('Part 2 solution:', filterOuterSeatIds(seats)[0]);
}


function binaryPartition(substring, initialRange) {
    return [...substring].reduce((range, ch) => PARTITION_CHAR[ch](range), initialRange)[1];
}


function getRowNumber(substring) {
    return binaryPartition(substring, [0, PLANE.ROWS]);
}


function getColNumber(substring) {
    return binaryPartition(substring, [0, PLANE.COLS]);
}