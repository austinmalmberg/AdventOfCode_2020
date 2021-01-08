const File = require('../fsUtils');
const { testOne } = require('../testUtils');

const OPERATIONS = Object.freeze({
    NO_OPERATION: 'nop',
    ACCUMULATOR: 'acc',
    JUMP: 'jmp',
});

const OPERATION_FUNC = Object.freeze({
    [OPERATIONS.NO_OPERATION]: (state) => ({
        ...state,
        next: state.next + 1
    }),
    [OPERATIONS.JUMP]: (state, value) => ({
        ...state,
        next: state.next + value,
    }),
    [OPERATIONS.ACCUMULATOR]: (state, value) => ({
        ...state,
        next: state.next + 1,
        total: state.total + value,
    }),
});

function runTests() {
    const file = new File('example1.txt');
    
    const lines = file.lines();
    const instructionArray = getInstructions(lines);
    
    testOne(() => instructionArray, [
        { operation: 'nop', value: 0 },
        { operation: 'acc', value: 1 },
        { operation: 'jmp', value: 4 },
        { operation: 'acc', value: 3 },
        { operation: 'jmp', value: -3 },
        { operation: 'acc', value: -99 },
        { operation: 'acc', value: 1 },
        { operation: 'jmp', value: -4 },
        { operation: 'acc', value: 6 },
    ], 'InstructionArray');
    
    testOne(() => evaluateSolutionOne(instructionArray), 5, 'SolutionOne');
    
    testOne(() => evaluateSolutionTwo(instructionArray).total, 8, 'SolutionTwo');
}

function getInstructions(lines) {
    return lines.map(line => {
        const [op, value] = line.split(' ');
        return { operation: op, value: Number(value) };
    });
}

function evaluateSolutionOne(arr) {
    let state = {
        next: 0,
        total: 0,
    };
    
    const seen = new Set();
    while (!seen.has(state.next)) {
        seen.add(state.next);
        
        const instruction = arr[state.next];
        const operation = OPERATION_FUNC[instruction.operation];
        
        state = operation(state, instruction.value);
    }
    
    return state.total;
}

function evaluateSolutionTwo(arr, state=undefined, seen=new Set(), flag=true) {
    // init state on first run
    if (!state) state = { next: 0, total: 0 };
    
    while (state.next >= 0 && state.next < arr.length) {
        // iteration will trigger an infinite loop, so return null
        if (seen.has(state.next)) return null;
        
        seen.add(state.next);
        
        const instruction = arr[state.next];
        
        if (flag && instruction.operation === OPERATIONS.JUMP ||
                instruction.operation === OPERATIONS.NO_OPERATION) {
                    
            const newInstruction = instruction.operation === OPERATIONS.JUMP ?
                    OPERATIONS.NO_OPERATION : OPERATIONS.JUMP;
                    
            const newOperation = OPERATION_FUNC[newInstruction];
            const newState = newOperation(state, instruction.value);
            
            const newEval = evaluateSolutionTwo(arr, newState, new Set([...seen]), false);
            
            // if a state is returned from our function, state.next was out of
            // our array bounds so pass it along
            if (newEval !== null) {
                return newEval;
            }
        }
        
        const operation = OPERATION_FUNC[instruction.operation];
        state = operation(state, instruction.value);
    }
    
    return state;
}


runTests();

const file1 = new File('input.txt');
const instructions = getInstructions(file1.lines());
console.log('Solutions:', {
    one: evaluateSolutionOne(instructions),
    two: evaluateSolutionTwo(instructions).total
});
