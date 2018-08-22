var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 스토어 정보 가져오기 */
router.post('/getinfo', (req, res) => {
    let query = [{ key: 'storeId', value: req.body.storeId }];
    model.store.store.getStamp(query, (err, r) => {
        let count = 0;
        let length = r.length;
        let data = r;
        if (r.length === 0) {
            return res.json({
                is_err: false,
                msg: '스탬프카드가 없습니다.',
                data: [],
            });
        }
        r.map(stamp => {
            let query = [{ key: 'stampId', value: stamp.stampId }];
            model.store.store.getCoupon(query, (err, r) => {
                stamp.couponConfig = r;
                count += 1;
                if (count === length) {
                    return res.json({
                        is_err: false,
                        msg: '스토어정보를 가져왔습니다.',
                        data: data,
                    });
                }
            });
        });
    });
});

module.exports = router;
