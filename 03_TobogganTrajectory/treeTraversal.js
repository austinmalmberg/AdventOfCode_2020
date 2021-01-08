const File = require('../fsUtils');

const MAP_OBJECTS = Object.freeze({
    TREE: '#',
    EMPTY: '.',
});

const file = new File('input.txt');
solution(file.lines());

function solution(lines) {

    /* PART 1 */

    const slope = [3, 1];
    const res1 = countObjects(lines, slope, MAP_OBJECTS.TREE);

    console.log(res1);

    /* PART 2 */

    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    const treesPerSlope = slopes.map(slope => countObjects(lines, slope, MAP_OBJECTS.TREE));
    const res2 = treesPerSlope.reduce((res, t) => res * t, 1);

    console.log(res2);
}

function countObjects(lines, [dCol, dRow], obj) {
    const width = lines[0].length;
    const wrapCol = (col) => col % width;

    const encounters = lines.filter((line, i) => i % dRow === 0)
        .map((line, i) => line[wrapCol(dCol * i)] );

    return encounters.filter(encounter => encounter === obj).length;
}
