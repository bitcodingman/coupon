var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 스토어 정보 가져오기 */
router.post('/getinfo', (req, res) => {
    let query = [{ key: 'userId', value: 5 }];
    model.store.store.get(query, (err, r) => {
        const data = r;

        let query = [{ key: 'storeId', value: r.storeId }];
        model.store.store.list('stamp', query, (err, r) => {
            data.stamp = r;

            return res.json({
                is_err: false,
                msg: '스토어정보를 가져왔습니다.',
                data: data,
            });

            // const sample = r.map(stamp => {
            //     let query = [{ key: 'stampId', value: stamp.stampId }];
            //     model.store.store.list('coupon_config', query, (err, r) => {
            //         stamp.couponConfig = r;
            //         test = r;
            //     });
            //     console.log(test);
            // });

            // return res.json({
            //     is_err: false,
            //     msg: '스토어정보를 가져왔습니다.',
            //     data: data,
            // });
            // for (let i = 0; i < r.length; i++) {
            //     let query = [{ key: 'stampId', value: r[i].stampId }];
            //     model.store.store.list('coupon_config', query, (err, r) => {
            //         data.stamp[i].couponConfig = r;
            //     });
            // }
        });
    });
});

module.exports = router;

// return res.json({
// 	is_err: false,
// 	msg: '스토어정보를 가져왔습니다.',
// 	data: r,
// });
