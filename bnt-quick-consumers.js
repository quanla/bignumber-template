const {consumeExpressionP} = require("./consume-expression-p");

const consumeMethod = (template, getMethod, consumeExpression) => {
    const match1 = /^\s*(\w+)\(\s*/.exec(template.strings[0]);
    if (!match1) {
        return null;
    }

    const methodName = match1[1];

    template = {
        strings: [template.strings[0].substring(match1[0].length), ...template.strings.slice(1)],
        values: template.values,
    };

    const expression = consumeExpression(template);
    if (!expression) {
        return null;
    }

    template = expression.remains;

    const match2 = /^\s*\)\s*/.exec(template.strings[0]);
    if (!match2) {
        return null;
    }

    return {
        value: getMethod(methodName)(expression.value),
        remains: {
            strings: [template.strings[0].substring(match2[0].length), ...template.strings.slice(1)],
            values: template.values,
        },
    };
};
const consumeGroup = (template, consumeExpression) => {
    const match1 = /^\s*\(\s*/.exec(template.strings[0]);
    if (!match1) {
        return null;
    }

    template = {
        strings: [template.strings[0].substring(match1[0].length), ...template.strings.slice(1)],
        values: template.values,
    };

    const expression = consumeExpression(template);
    if (!expression) {
        return null;
    }

    template = expression.remains;

    const match2 = /^\s*\)\s*/.exec(template.strings[0]);
    if (!match2) {
        return null;
    }

    return {
        value: expression.value,
        remains: {
            strings: [template.strings[0].substring(match2[0].length), ...template.strings.slice(1)],
            values: template.values,
        },
    };
};
const consumeStrNumber = (template, negate) => {
    const match = /^\s*(-\s*)?([\d.]+)\s*/.exec(template.strings[0]);
    if (!match) {
        return null;
    }

    return {
        value: !match[1] ? match[2] : negate(match[2]),
        remains: {
            strings: [template.strings[0].substring(match[0].length), ...template.strings.slice(1)],
            values: template.values,
        },
    };
};

const consumeOperator = (template) => {
    const match = /^\s*(==|!=|<=|>=|[-+*/<>])\s*/.exec(template.strings[0]);
    if (!match) {
        return null;
    }

    return {
        value: match[1],
        remains: {
            strings: [template.strings[0].substring(match[0].length), ...template.strings.slice(1)],
            values: template.values,
        },
    };
};

const consumeTemplateValue = (template) => {
    const match = /^\s*$/.exec(template.strings[0]);
    if (!match) {
        return null;
    }

    return {
        value: template.values[0],
        remains: {
            strings: template.strings.slice(1),
            values: template.values.slice(1),
        },
    };
};

exports.consumeExpression = consumeExpressionP({consumeStrNumber, consumeTemplateValue, consumeGroup, consumeMethod, consumeOperator});