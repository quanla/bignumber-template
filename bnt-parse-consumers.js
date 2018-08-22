const {consumeExpressionP} = require("./consume-expression-p");

const consumeMethod = (template, getMethod, consumeExpression) => {
    const match1 = /^\s*(\w+)\(\s*/.exec(template);
    if (!match1) {
        return null;
    }

    const methodName = match1[1];

    template = template.substring(match1[0].length);

    const expression = consumeExpression(template);
    if (!expression) {
        return null;
    }

    template = expression.remains;

    const match2 = /^\s*\)\s*/.exec(template);
    if (!match2) {
        return null;
    }

    return {
        value: getMethod(methodName)(expression.value),
        remains: template.substring(match2[0].length),
    };
};

const consumeGroup = (template, consumeExpression) => {
    const match1 = /^\s*\(\s*/.exec(template);
    if (!match1) {
        return null;
    }

    template = template.substring(match1[0].length);

    const expression = consumeExpression(template);
    if (!expression) {
        return null;
    }

    template = expression.remains;

    const match2 = /^\s*\)\s*/.exec(template);
    if (!match2) {
        return null;
    }

    return {
        value: expression.value,
        remains: template.substring(match2[0].length),
    };
};
const consumeStrNumber = (template, negate) => {
    const match = /^\s*(-\s*)?([\d.e]+)\s*/.exec(template);
    if (!match) {
        return null;
    }

    return {
        value: () => !match[1] ? match[2] : negate(match[2]),
        remains: template.substring(match[0].length),
    };
};

const consumeOperator = (template) => {
    const match = /^\s*(==|\*\*|!=|<=|>=|[-+*/<>])\s*/.exec(template);
    if (!match) {
        return null;
    }

    return {
        value: match[1],
        remains: template.substring(match[0].length),
    };
};

const consumeTemplateValue = (template) => {
    const match = /^\s*(\w+)\s*/.exec(template);
    if (!match) {
        return null;
    }

    return {
        value: (values) => values[match[1]],
        remains: template.substring(match[0].length),
    };
};

exports.consumeExpression = consumeExpressionP({consumeStrNumber, consumeTemplateValue, consumeGroup, consumeMethod, consumeOperator});