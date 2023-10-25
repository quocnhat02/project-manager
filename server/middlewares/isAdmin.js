import User from "../model/User.js";

const isAdmin = async( req, res, next) => {
    const user = await User.findById(req.userAuthId);

    if(user.isAdmin){
        next();
    }else{
        next(new Error("Truy cập bị từ chối, chỉ quản trị viên mới được truy cập"));
    }
};

export default isAdmin;