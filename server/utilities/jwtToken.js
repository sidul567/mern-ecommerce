// send token and save cookies
const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();
    
    const offset = new Date().getTimezoneOffset();

    // set cookie option
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 - offset * 60 * 1000),
        secure: true,
        sameSite: 'none',
    }    
    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        user,
        token, 
    });
}

module.exports = sendToken;