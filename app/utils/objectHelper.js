function copyObjectFields(obj, fields) {
    const objectCopy = fields.reduce((prev, current) => {
        if (obj.hasOwnProperty(current)) {
            prev[current] = obj[current];
        }
        return prev;
    }, {});
    return objectCopy;
}

module.exports = {
    copyObjectFields,
};
