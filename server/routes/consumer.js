var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 적립중인 스탬프 가져오기 */
router.post('/savingStampList', (req, res) => {
    let query = { userId: req.body.userId };
    model.consumer.consumer.stampList(query, (err, r) => {
        if (err) {
            throw err;
        }

        if (is_empty(r)) {
            return res.json({
                isErr: true,
                msg: '적립중인 스탬프가 없습니다.',
                data: null,
            });
        }

        const stampInfo = r;

        model.consumer.consumer.history(query, (err, r) => {
            if (err) {
                throw err;
            }

            if (is_empty(r)) {
                return res.json({
                    isErr: true,
                    msg: '적립중인 내역이 없습니다.',
                    data: null,
                });
            }

            let stampList = [];

            for (let i = 0; i < stampInfo.length; i++) {
                let stampObj = stampList.find(listItem => {
                    return listItem.stampId === stampInfo[i].stampId;
                });

                if (is_empty(stampObj)) {
                    const result = r.filter(listItem => {
                        return listItem.stampId === stampInfo[i].stampId;
                    });

                    const history = result.map(list => ({
                        stampSaveNo: list.stampSaveNo,
                        stampSaveDate: list.stampSaveDate,
                    }));

                    stampObj = {
                        storeName: stampInfo[i].storeName,
                        storePhone: stampInfo[i].storePhone,
                        addressSi: stampInfo[i].addressSi,
                        addressGu: stampInfo[i].addressGu,
                        addressDong: stampInfo[i].addressDong,
                        addressDetail: stampInfo[i].addressDetail,
                        stampId: stampInfo[i].stampId,
                        stampTerm: stampInfo[i].stampTerm,
                        stampMaximum: stampInfo[i].stampMaximum,
                        stampPublishDate: stampInfo[i].stampPublishDate,
                        stampFinishDate: stampInfo[i].stampFinishDate,
                        couponConfig: [],
                        saveHistory: history,
                    };

                    stampList.push(stampObj);
                }

                stampObj.couponConfig.push({
                    couponId: stampInfo[i].couponId,
                    couponPublishTerm: stampInfo[i].couponPublishTerm,
                    couponItemName: stampInfo[i].couponItemName,
                    itemImg: stampInfo[i].itemImg,
                });
            }

            return res.json({
                isErr: false,
                msg: '적립중인 스탬프 내역을 가져왔습니다.',
                data: stampList,
            });
        });
    });
});

/* 사용가능한 쿠폰 가져오기 */
router.post('/couponList', (req, res) => {
    let query = { userId: req.body.userId };
    model.consumer.consumer.couponList(query, (err, r) => {
        if (err) {
            throw err;
        }

        if (is_empty(r)) {
            return res.json({
                isErr: true,
                msg: '사용가능한 쿠폰이 없습니다.',
                data: null,
            });
        }

        return res.json({
            isErr: false,
            msg: '적립중인 스탬프 내역을 가져왔습니다.',
            data: r,
        });
    });
});

module.exports = router;
