var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 적립중인 스탬프 가져오기 */
router.post('/savestamp', (req, res) => {
    let query = { userId: 1 };
    model.consumer.consumer.list(query, (err, r) => {
        let stampList = [];

        for (let i = 0; i < r.length; i++) {
            let stampObj = stampList.find(listItem => {
                return listItem.stampId === r[i].stampId;
            });

            if (is_empty(stampObj)) {
                stampObj = {
                    storeName: r[i].storeName,
                    storePhone: r[i].storePhone,
                    addressSi: r[i].addressSi,
                    addressGu: r[i].addressGu,
                    addressDong: r[i].addressDong,
                    addressDetail: r[i].addressDetail,
                    stampId: r[i].stampId,
                    stampTerm: r[i].stampTerm,
                    stampMaximum: r[i].stampMaximum,
                    stampPublishDate: r[i].stampPublishDate,
                    stampFinishDate: r[i].stampFinishDate,
                    couponConfig: [],
                };
                stampList.push(stampObj);
            }
            stampObj.couponConfig.push({
                couponId: r[i].couponId,
                couponPublishTerm: r[i].couponPublishTerm,
                couponItemName: r[i].couponItemName,
                itemImg: r[i].itemImg,
            });
        }

        let query = { userId: 1, stampId: stampList[0].stampId };
        model.consumer.consumer.history(query, (err, r) => {
            stampList.saveHistory = r;
            res.json(stampList);
        });
    });
});

/* 사용가능한 쿠폰 가져오기 */
router.get('/currentcouponlist', (req, res) => {
    res.send('사용가능한 쿠폰 리스트');
});

module.exports = router;
