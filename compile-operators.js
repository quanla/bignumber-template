const {operator2s} = require("./operators");
const {findMinIndex} = require("./collections");

const compileOperators = (execOperator) => {
    const compile = (values, operators) => {
        if (values.length === 1) {
            return values[0];
        }
        let index = findPrioritizedOp(operators);

        return compile(
            [
                ...values.slice(0, index),
                execOperator(operators[index], values[index], values[index + 1]),
                ...values.slice(index + 2)
            ],
            [
                ...operators.slice(0, index),
                ...operators.slice(index + 1)
            ],
        );
    };
    return compile;
};

exports.compileOperators = compileOperators;

const findPrioritizedOp = (operators) => {
    return findMinIndex(operators, (op) => operator2s[op].priority);
};
