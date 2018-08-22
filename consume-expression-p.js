
const consumeExpressionP = ({consumeStrNumber, consumeTemplateValue, consumeGroup, consumeMethod, consumeOperator}) => {

    const consumeValue = (template, getMethod, consumeExpression) => {
        const strNumber = consumeStrNumber(template, getMethod("negate"));
        if (strNumber) {
            return strNumber;
        }
        const method = consumeMethod(template, getMethod, consumeExpression);
        if (method) {
            return method;
        }

        const group = consumeGroup(template, consumeExpression);
        if (group) {
            return group;
        }

        const templateValue = consumeTemplateValue(template);
        if (templateValue) {
            return templateValue;
        }

        return null;
    };

    const consumeExpression = (template, exec) => {
        let values = [];
        let operators = [];

        for (; ;) {
            const value = consumeValue(template, (methodName) => (v) => exec.method(v, methodName), (template) => consumeExpression(template, exec));
            if (!value) {
                return null; // Error
            }
            values.push(value.value);
            template = value.remains;

            const operator = consumeOperator(template);
            if (!operator) {
                break;
            }
            operators.push(operator.value);
            template = operator.remains;
        }

        if (values.length === 0) {
            return null;
        }

        return {
            value: exec.operators(values, operators),
            remains: template,
        };
    };
    return consumeExpression;
};
exports.consumeExpressionP = consumeExpressionP;