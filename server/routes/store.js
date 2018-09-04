var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 쿠폰 아이템 이미지 가져오기 */
router.get('/itemimg', (req, res) => {
    let query = [{ key: 'itemImgId', value: 'itemImgId' }];
    model.store.store.itemImgList(query, (err, r) => {
        if (is_empty(r)) {
            return res.json({
                isErr: true,
                msg: '아이템 이미지 정보를 찾지 못했습니다.',
                data: null,
            });
        }

        let itemImgList = [];
        for (let i = 0; i < r.length; i++) {
            let category = itemImgList.find(item => {
                return item.imgCategory === r[i].imgCategory;
            });

            if (is_empty(category)) {
                category = {
                    imgCategory: r[i].imgCategory,
                    imgList: [],
                };
                itemImgList.push(category);
            }

            let item = {
                itemImgId: r[i].itemImgId,
                itemImg: r[i].itemImg,
            };
            category.imgList.push(item);
        }

        return res.json({
            isErr: false,
            msg: '아이템 이미지 정보를 찾았습니다.',
            data: itemImgList,
        });
    });
});

/* 스탬프 리스트 가져오기 */
router.post('/stampList', (req, res) => {
    let query = [{ key: 'storeId', value: req.body.storeId }];
    model.store.store.list(query, (err, r) => {
        if (err) {
            throw err;
        }

        if (is_empty(r)) {
            return res.json({
                isErr: true,
                msg: '스탬프 정보를 찾지 못했습니다.',
                data: null,
            });
        }

        let stampList = [];

        for (let i = 0; i < r.length; i++) {
            let stampObj = stampList.find(listItem => {
                return listItem.stampId === r[i].stampId;
            });

            if (is_empty(stampObj)) {
                stampObj = {
                    stampId: r[i].stampId,
                    stampTerm: r[i].stampTerm,
                    stampMaximum: r[i].stampMaximum,
                    couponConfig: [],
                };
                stampList.push(stampObj);
            }
            stampObj.couponConfig.push({
                couponId: r[i].couponId,
                couponPublishTerm: r[i].couponPublishTerm,
                couponItemName: r[i].couponItemName,
                imgCategory: r[i].imgCategory,
                itemImg: r[i].itemImg,
            });
        }

        return res.json({
            isErr: false,
            msg: '스토어정보를 가져왔습니다.',
            data: stampList,
        });
    });
});

/* 스탬프 저장하기 */
router.post('/setStamp', (req, res) => {
    const { couponConfig, storeId } = req.body.stampInfo;
    if (is_empty(req.body.stampInfo.stampMaximum)) {
        return res.json({
            isErr: true,
            msg: '스탬프 정보가 없습니다.',
            data: null,
        });
    }

    if (is_empty(couponConfig)) {
        return res.json({
            isErr: true,
            msg: '쿠폰설정이 없습니다.',
            data: null,
        });
    }

    model.store.store.insert_stamp(req.body.stampInfo, (err, r) => {
        if (err) {
            throw err;
        }
        return res.json({
            isErr: false,
            msg: '스탬프 정보를 저장했습니다.',
            data: null,
        });
    });
});

module.exports = router;
