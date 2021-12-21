const jwt = require("jsonwebtoken");
 const isAuth=() =>
 (req, res, next) => {
   const headers = req.body.headers || req.headers.authorization; 

 if(!headers){
    req.isAuth=false;
    return next()
    }
    let token;
    if(req.headers.authorization){
         token = headers.split(' ')[1];
        console.log(token)
    }else {
 token = Object.values(headers)[1].split(' ')[1];
     }
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try{
     decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    }catch(err){ req.isAuth = false;
    return next();}
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth= true;
    req.userId = decodedToken.user_Id
    console.log(req.isAuth)
    next();
};

module.exports = {isAuth}