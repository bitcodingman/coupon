'use strict';

var consumer = {
    get: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        _query.forEach(function(e) {
            if (e.key === 'userId') {
                where_query = util.format('%s AND U.userId = ?', where_query);
                values.push(e.value);
            }

            if (e.key === 'name') {
                where_query = util.format('%s AND U.name = ?', where_query);
                values.push(util.format(e.value));
            }
        });

        var sql = `select *
        from 
            user U
        where 
            {where_query}
        `.replace('{where_query}', where_query);

        engine.rds.row(sql, values, 'cp', _callback);
    },

    stampList: function(_query, _callback) {
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
							SS.storeId = ST.storeId
					AND 
							T.stampId = C.stampId
					AND 
							T.stampId = SS.stampId
					AND 
							C.itemImgId = I.itemImgId
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
								stampId, stampSaveNo, stampSaveDate
						from
								stamp_save SS join stamp_save_history SH
						on
								SS.stampSaveId = SH.stampSaveId
						and
								{where_query}`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },

    couponList: function(_query, _callback) {
        var values = [];
        var where_query = '1=1';

        if (_query.hasOwnProperty('userId')) {
            where_query = util.format('%s AND CL.userId = ?', where_query);
            values.push(_query.userId);
        }

        var sql = `
					select
							couponListId, storeName, couponItemName, couponFinishDate, itemImg
					from 
							coupon_config CC join coupon_list CL join item_img I join store S
					ON
							CC.couponId = CL.couponId
					AND 
							CL.storeId = S.storeId
					AND 
							CC.itemImgId = I.itemImgId
					AND 
							CL.couponUseDate is null
					AND
							CL.couponFinishDate > now()
					AND
							{where_query}
					ORDER BY CL.couponFinishDate ASC
				`.replace('{where_query}', where_query);

        engine.rds.rows(sql, values, 'cp', _callback);
    },
};

module.exports = consumer;
