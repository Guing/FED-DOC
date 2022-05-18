import express, { } from 'express';
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import './controller/LoginController'
import './controller/DataController'
import router from './router'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
    name: 'session',
    keys: ['typescript-api'],
    maxAge: 24 * 60 * 60 * 10000
}))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-pagination'); 
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", "x-pagination");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(router);
app.listen(8000, () => {
    console.log("server success!");
})