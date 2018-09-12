'use strict';

var store = {
    updateStamp: function(_stampInfo, _callback) {
        const execute = (connection, next) => {
            let sql = `
							UPDATE stamp
							SET stampTerm = ?, stampMaximum = ?, created = ?
							WHERE stampId = ${_stampInfo.stampId}
						`;

            connection.query(
                sql,
                [_stampInfo.stampTerm, _stampInfo.stampMaximum, new Date()],
                (err, results) => {
                    if (err) return next(err);

                    return err ? next(err) : next(null, results.affectedRows);
                }
            );
        };

        engine.rds.transaction(execute, 'cp', _callback);
    },

    insertStamp: function(_stampInfo, _callback) {
        const execute = (connection, next) => {
            connection.query(
                'INSERT INTO stamp (storeId, stampTerm, stampMaximum, created) values (?, ?, ?, ? ) ',
                [
                    _stampInfo.storeId,
                    _stampInfo.stampTerm,
                    _stampInfo.stampMaximum,
                    new Date(),
                ],
                (err, results) => {
                    if (err) return next(err);

                    const { insertId: stampId } = results;

                    // 오류나 에러를 반환 하는 경우 rollback 호출
                    if (!stampId) {
                        return next('rollback');
                    }

                    let qq = _stampInfo.couponConfig.map(coupon => {
                        const values = [];
                        values.push(_stampInfo.storeId);
                        values.push(stampId);
                        for (let key in coupon) {
                            values.push(coupon[key]);
                        }
                        return values;
                    });

                    connection.query(
                        ' INSERT INTO coupon_config (storeId, stampId, couponPublishTerm, couponItemName, itemImgId) VALUES ?',
                        [qq],
                        (err, results) => {
                            // 마지막 쿼리 문에서 에러가 없을 경우,
                            // next NULL 을 호출 하게 되는 경우 commit이 됨.
                            return err
                                ? next(err)
                                : next(null, results.affectedRows);
                        }
                    );
                }
            );
        };

        engine.rds.transaction(execute, 'cp', _callback);
    },

    get: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        _query.forEach(function(e) {
            if (e.key === 'userId') {
                where_query = util.format('%s AND S.userId = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'name') {
                where_query = util.format('%s AND S.name = ?', where_query);
                values.push(util.format(e.value));
            }
        });

        var sql = `select *
        from 
            store S
        where 
            {where_query}
        `.replace('{where_query}', where_query);

        engine.rds.row(sql, values, 'cp', _callback);
    },

    list: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        _query.forEach(function(e) {
            if (e.key === 'storeId') {
                where_query = util.format('%s AND T.storeId = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'stampId') {
                where_query = util.format('%s AND T.stampId = ?', where_query);
                values.push(e.value);
            }
        });

        var sql = `select T.stampId, stampTerm, stampMaximum, couponId, couponPublishTerm, couponItemName, C.itemImgId, itemImg
            from 
							stamp T join coupon_config C join item_img I
						ON
								T.storeId = C.storeId
						AND 
								T.stampId = C.stampId
						AND 
								C.itemImgId = I.itemImgId
						AND
								{where_query}
						ORDER BY T.created DESC, couponPublishTerm ASC`.replace(
            '{where_query}',
            where_query
        );

        engine.rds.rows(sql, values, 'cp', _callback);
    },

    itemImgList: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        var sql = `SELECT itemImgId, imgCategory, itemImg
					from 
						item_img I
					where
							{where_query}`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },
};

module.exports = store;
