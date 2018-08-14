'use strict';

var mysql = require('mysql');

class rds_Interface {
    /**
     *
     * @param {*} _args // [0]  Databases 연결
     */
    constructor(_dsn) {
        this._d = undefined; // 각 DB Driver가 접속하여 생성된 개체
        this._dsn = _dsn || undefined;
    }

    is_d() {
        if (this._d == undefined) {
            return false;
        }

        return true;
    }

    destroy() {
        return false;
    }
    init() {
        return false;
    }
    close() {
        return false;
    }

    //select 문
    row(_sql, _values, _callback) {
        return false;
    }
    rows(_sql, _values, _callback) {
        return false;
    }

    // update , insert 문 실행 할때
    execute(_sql, _values, _callback) {
        return false;
    }
}

class c_mysql extends rds_Interface {
    constructor(..._args) {
        super(_args[0] || undefined);

        //mysql의 경우 createConnection를 진행 하여도 실 DB에는 접속하지 않기 때문에,
        //클래스 생성시 실행해 둠.
        this.init();
    }

    destroy() {
        this.close();
    }

    init() {
        if (this._dsn == undefined) {
            return true;
        }

        this._d = mysql.createConnection({
            host: this._dsn.host,
            user: this._dsn.user,
            password: this._dsn.password,
            port: this._dsn.port,
            database: this._dsn.database,
        });

        if (this._d == undefined) {
            return false;
        }

        return true;
    }

    close() {
        if (this._d) {
            this._d.end();
        }
    }

    row(_sql, _values, _callback) {
        if (this.is_d() == false) {
            return null;
        }

        this._d.query(_sql, _values, function(err, rows) {
            if (err) throw err;

            if (rows.length != 1) {
                return _callback(true, []);
            }

            return _callback(err, rows[0]);
        });

    }

    rows(_sql, _values, _callback) {
        if (this.is_d() == false) {
            return null;
        }

        // createConnection 이후에는 별도의 connect가 불필요 하다.
        // this._d.connect(function(err) {
        //     if (err) {
        //       console.error('error connecting: ' + err.stack);
        //       return;
        //     }
        // });

        this._d.query(_sql, _values, function(err, rows) {
            if (err) throw err;

            _callback(err, rows);
            //console.log('The solution is: ', rows);
        });
    }

    execute(_sql, _values, _callback) {
        if (this.is_d() == false) {
            return null;
        }

        this._d.query(_sql, _values, function(err, rows) {
            if (err) throw err;

            _callback(err, rows);

            // rows.insertId  auto_increment 반환 <Insert인 경우>
        });
    }
}

module.exports = c_mysql;
