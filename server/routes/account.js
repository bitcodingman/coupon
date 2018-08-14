var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());

/* GET users listing. */
router.get('/getsession', (req, res) => {
    const sessionData = model.user.session.get(req);
    if (!is_empty(sessionData)) {
        return res.json({
            is_err: false,
            msg: '세션데이터가 존재합니다.',
            data: sessionData,
        });
    }

    return res.json({
        is_err: true,
        msg: '세션데이터가 없습니다.',
        data: {},
    });
});

/* GET users listing. */
router.post('/signin', (req, res) => {
    if (!req.body.email) {
        return res.json({
            is_err: true,
            msg: '아이디(이메일)를 입력하세요.',
            data: {},
        });
    }

    if (!req.body.password) {
        return res.json({
            is_err: true,
            msg: '패스워드를 입력하세요.',
            data: {},
        });
    }

    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    const query = [{ key: 'email', value: reqEmail }];

    model.user.user.get(query, (err, r) => {
        if (err) {
            return res.json({
                is_err: true,
                msg: '계정정보를 찾을 수 없습니다.',
                data: {},
            });
        }

        if (r.pw != reqPassword) {
            return res.json({
                is_err: true,
                msg: '비밀번호를 확인하세요.',
                data: {},
            });
        }

        var u_session = model.user.session.get_info();
        u_session['userType'] = r['user_type'];
        u_session['email'] = r['email'];

        model.user.session.set(req, u_session, () => {
            return res.json({
                is_err: false,
                msg: '로그인 성공',
                data: r,
            });
        });
    });
});

router.post('/signup', (req, res) => {
    /* to be implemented */
    res.json({ success: true });
});

router.post('/logout', (req, res) => {
    engine.session.del(req, () => {
        return res.json({
            is_err: false,
            msg: '로그아웃 성공',
            data: {},
        });
    });
    // return res.json({ sucess: true });
});

module.exports = router;
