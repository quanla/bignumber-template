const bigNumber = require("bignumber.js");
const op = (methodName) => (v1, v2) => bigNumber(v1)[methodName](bigNumber(v2));
const operator2s = {
    "+": {
        priority: 2,
        method: op("plus"),
    },
    "-": {
        priority: 2,
        method: op("minus"),
    },
    "*": {
        priority: 1,
        method: op("multipliedBy"),
    },
    "/": {
        priority: 1,
        method: op("dividedBy"),
    },
    "%": {
        priority: 1,
        method: op("modulo"),
    },
    ">": {
        priority: 3,
        method: op("gt"),
    },
    ">=": {
        priority: 3,
        method: op("gte"),
    },
    "<": {
        priority: 3,
        method: op("lt"),
    },
    "<=": {
        priority: 3,
        method: op("lte"),
    },
    "==": {
        priority: 3,
        method: op("isEqualTo"),
    },
    "!=": {
        priority: 3,
        method: (v1, v2) => !bigNumber(v1).isEqualTo(bigNumber(v2)),
    },
};
exports.operator2s = operator2s;

const operator1s = {
    "sqrt": (v) => bigNumber(v).squareRoot(),
    "abs": (v) => bigNumber(v).abs(),
    "negate": (v) => bigNumber(v).negated(),
};
exports.operator1s = operator1s;