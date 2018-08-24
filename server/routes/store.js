var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 스탬프 정보 가져오기 */
router.post('/getinfo', (req, res) => {
    let query = [{ key: 'storeId', value: req.body.storeId }];
    model.store.store.list(query, (err, r) => {
        let stampList = [];
        const setData = stamp => {
            let stampObj = stampList.find(listItem => {
                return listItem.stampId === stamp.stampId;
            });

            if (!stampObj) {
                stampObj = {
                    stampId: stamp.stampId,
                    stampTerm: stamp.stampTerm,
                    stampMaximum: stamp.stampMaximum,
                    couponConfig: [],
                };
                stampList.push(stampObj);
            }
            stampObj.couponConfig.push({
                couponId: stamp.couponId,
                couponPublishTerm: stamp.couponPublishTerm,
                couponItemName: stamp.couponItemName,
                imgCategory: stamp.imgCategory,
                itemImg: stamp.itemImg,
            });
            return stampList;
        };

        for (let i = 0; i < r.length; i++) {
            setData(r[i]);
        }

        if (!stampList || stampList.length === 0) {
            return res.json({
                is_err: false,
                msg: '스탬프 정보를 찾지 못했습니다.',
                data: null,
            });
        }

        return res.json({
            is_err: false,
            msg: '스토어정보를 가져왔습니다.',
            data: stampList,
        });
    });
});

module.exports = router;
