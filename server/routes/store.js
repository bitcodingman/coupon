var express = require('express');
var bodyParser = require('body-parser');
var groupArray = require('group-array');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 스토어 정보 가져오기 */
router.post('/getinfo', (req, res) => {
    let query = [{ key: 'storeId', value: req.body.storeId }];
    model.store.store.list(query, (err, r) => {
        const groupArr = groupArray(r, 'stampId');
        console.log(groupArr);
        return res.json({
            is_err: false,
            msg: '스토어정보를 가져왔습니다.',
            data: groupArr,
        });
    });
});

module.exports = router;

// return res.json({
// 	is_err: false,
// 	msg: '스토어정보를 가져왔습니다.',
// 	data: r,
// });
