const jwt = require("jsonwebtoken");
// const {secretKey} = require("../controllers/auth");

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY, (err,user)=>{
            if(err) res.status(400),json("token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not Authenticated!")
    }
}

const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are forbidden to do that, only Admin can do that!")
        }
    })

}

const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res, ()=> {
        if(req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are forbidden to do that, only Admin can do that!")
        }
    })

}

// module.exports = verifyTokenAndAuthorization
module.exports = {
    verifyToken, 
    verifyTokenAndAuthorization
}