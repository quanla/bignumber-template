const {operator1s, operator2s} = require("./operators");

const execOperator = (op, v1, v2) => {
    const operator = operator2s[op];
    return operator.method(v1, v2);
};
exports.execOperator = execOperator;


const execMethod = (value, methodName) => {
    return operator1s[methodName](value);
};

exports.execMethod = execMethod;