
import { Request, Response, NextFunction } from "express"

interface Result {
    data: any;
    success: boolean;
    errMsg?: string;
}

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.isLogin) {
        next();
    } else {
        res.json(getResponseData(null, '请先登录'));
    }
}

export const getResponseData = (data: any, errMsg?: string): Result => {
    if (errMsg) {
        return {
            data,
            success: false,
            errMsg
        }
    } else {
        return {
            data,
            success: true
        }
    }
}