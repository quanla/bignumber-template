const {operator1s, operator2s} = require("./operators");

const lazyOperator = (op, v1, v2) => {
    const operator = operator2s[op];
    return (values) => operator.method(v1(values), v2(values));
};
exports.lazyOperator = lazyOperator;

const lazyMethod = (value, methodName) => {
    return (values) => operator1s[methodName](value(values));
};

exports.lazyMethod = lazyMethod;