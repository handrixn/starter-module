'use strict'

module.exports = () => ({
    code: null,
    status(code) {
        this.code = code;
        return ({
            code,
            json: (data) => data
        });
    },
    json(data) {
        return JSON.stringify(data);
    }
});