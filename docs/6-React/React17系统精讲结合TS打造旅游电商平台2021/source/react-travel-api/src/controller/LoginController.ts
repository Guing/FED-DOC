import { Request, Response, NextFunction } from 'express'
import { getResponseData } from '../utils/index'
import { get, post, controller } from '../decorator/'
interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}

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
@controller('/')
export class LoginController {

    @get('/')
    home(req: Request, res: Response, next: NextFunction) {

        if (req.session?.isLogin) {
            res.send(homePageHtml);
        } else {
            res.send(loginPageHtml);
        }

    }
    @post('/login')
    login(req: RequestWithBody, res: Response) {
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
    }
    @get('/logout')
    logout(req: Request, res: Response) {

        if (req.session) {
            req.session.isLogin = undefined;
        }
        res.json(getResponseData(true));
    }
}

