const {compileOperators} = require("./compile-operators");
const {consumeExpression: parseConsumeExpression} = require("./bnt-parse-consumers");
const {execOperator, execMethod} = require("./exec-operators");
const {lazyOperator, lazyMethod} = require("./lazy-operators");
const {consumeExpression: quickConsumeExpression} = require("./bnt-quick-consumers");

const bnt = (strings, ...values) => {
    if (Array.isArray(strings)) {
        return quickExec(strings, values);
    } else {
        return parseTemplate(strings);
    }
};

exports.bnt = bnt;


const quickExec = (strings, values) => {
    let template = {strings, values};
    const result = quickConsumeExpression(template, {operators: compileOperators(execOperator), method: execMethod});

    if (result == null) {
        throw `Unexpected ${strings[0]}`;
    }
    if (result.remains.strings.length > 1 || (result.remains.strings.length === 1 && result.remains.strings[0].trim() !== "")) {
        throw `Unexpected ${result.remains.strings[0]}`;
    }
    if (result.remains.values.length) {
        throw `Unexpected value: ${result.remains.values[0]}`;
    }

    return typeof result.value !== "object" ? result.value : result.value.toString();
};

const parseTemplate = (template) => {
    const result = parseConsumeExpression(template, {operators: compileOperators(lazyOperator), method: lazyMethod});

    if (result == null) {
        throw `Unexpected ${template}`;
    }
    if (result.remains) {
        throw `Unexpected ${result.remains}`;
    }

    return (values) => {
        const ret = result.value(values);
        return typeof ret !== "object" ? ret : ret.toString();
    };
};