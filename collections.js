const findMinIndex = (col, getValue) => {
    let minVal = undefined;
    let minIndex = undefined;

    for (let i = 0; i < col.length; i++) {
        const e = col[i];

        if (minVal === undefined || minVal > getValue(e)) {
            const v = getValue(e);
            if (v != null) {
                minVal = v;
                minIndex = i;
            }
        }
    }
    return minIndex;
};

exports.findMinIndex = findMinIndex;