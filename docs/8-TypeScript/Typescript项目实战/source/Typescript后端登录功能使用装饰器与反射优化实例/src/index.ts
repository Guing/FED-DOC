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
app.use(router);
app.listen(8000, () => {
    console.log("server success!");
})