var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* 스토어 정보 가져오기 */
router.post('/getinfo', (req, res) => {
    const query = [{ key: 'user_id', value: req.body.userId }];
    model.store.store.get(query, (err, r) => {
        return res.json({
            is_err: false,
            msg: '스토어정보를 가져왔습니다.',
            data: r,
        });
    });
});

module.exports = router;
