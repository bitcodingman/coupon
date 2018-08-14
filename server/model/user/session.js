'use strict';

var user_session = {
    get_info() {
        return {
            userType: null,
            email: null,
            barcode: null,
        };
    },

    set(_req, _json, _callback) {
        engine.session.set(_req, 'accountInfo', _json, () => {
            _callback();
        });
    },

    get(_req) {
        return engine.session.get(_req, 'accountInfo');
    },
};

module.exports = user_session;
