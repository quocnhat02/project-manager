import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);
    if(!decodedUser){
        throw new Error("Token không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại")
    } else{
        req.userAuthId = decodedUser?.id;
        next();
    }
}