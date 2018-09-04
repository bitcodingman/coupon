'use strict';

var consumer = {
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

        if (_query.hasOwnProperty('userId')) {
            where_query = util.format('%s AND SS.userId = ?', where_query);
            values.push(_query.userId);
        }

        var sql = `
					select
							T.stampId, stampTerm, stampMaximum, couponId, couponPublishTerm, couponItemName, itemImg, stampPublishDate, stampFinishDate, storeName, storePhone, addressSi, addressGu, addressDong, addressDetail
					from 
							store ST join stamp_save SS join stamp T join coupon_config C join item_img I
					ON
							T.storeId = C.storeId
					AND 
							SS.storeId = ST.storeId
					AND 
							T.stampId = C.stampId
					AND 
							C.itemImgId = I.itemImgId
					AND
							T.storeId = SS.storeId
					AND
							{where_query}
				`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },

    history: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        if (_query.hasOwnProperty('userId')) {
            where_query = util.format('%s AND SS.userId = ?', where_query);
            values.push(_query.userId);
        }

        if (_query.hasOwnProperty('stampId')) {
            where_query = util.format('%s AND SS.stampId = ?', where_query);
            values.push(_query.stampId);
        }

        var sql = `
						select
								stampSaveNo, stampSaveDate
						from
								stamp_save SS join stamp_save_history SH
						on
								SS.stampSaveId = SH.stampSaveId
						and
								{where_query}`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },
};

module.exports = consumer;
