
import Express, { Router, Request, Response, NextFunction } from 'express'

import { getResponseData, checkLogin } from './utils/index'

import * as Data from './utils/data.json'
interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}



const router = Router();

const homePageHtml = `
<html>
<body>
 <a  href="/showData" >展示数据</a>
 <a  href="/logout" >退出登录</a>
</body>
</html>
`
const loginPageHtml = `
<html>
<body>
  <form method="post" action="/login">
    <input type="password" name="password" />
    <button>登陆</button>
  </form>
</body>
</html>
`

router.get('/', (req: Request, res: Response, next: NextFunction) => {

    if (req.session?.isLogin) {
        res.send(homePageHtml);
    } else {
        res.send(loginPageHtml);
    }

})

router.post('/login', (req: RequestWithBody, res: Response) => {
    if (req.session?.isLogin) {
        res.json(getResponseData(false, '已经登录过'))
    } else {
        if (req.body?.password === '123456' && req.session) {
            req.session.isLogin = true;
            res.json(getResponseData(true))
        } else {
            res.json(getResponseData(false, '登录失败'));
        }
    }
})


router.get('/logout', checkLogin, (req: Request, res: Response) => {

    if (req.session) {
        req.session.isLogin = undefined;
    }
    res.json(getResponseData(true));
})

router.get('/showData', checkLogin, (req: Request, res: Response) => {

    res.json(getResponseData(Data))

})

export default router;