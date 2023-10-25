export const getTokenFromHeader = (req) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if(token === undefined){
        return "Không tìm thấy token ở Header";
    }else {
        return token;
    }
}