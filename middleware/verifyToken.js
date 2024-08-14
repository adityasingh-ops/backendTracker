const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
        if(authHeader){
            const usertoken = authHeader.split(" ")[1];
            jwt.verify(usertoken, process.env.SECRET_KEY, async (err, user) => {
                if(err){
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        }else{
            return res.status(401).json("You are not authenticated!");
        }
};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.usertype === "user" || req.user.usertype === "store" || req.user.usertype === "admin" || req.user.usertype === "delivery"){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
const verifyStore = (req, res, next) => {

    verifyToken(req, res, () => {
        if(req.user.usertype === "store"|| req.user.usertype === "admin"){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.usertype === "admin"){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};
const verifyDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.usertype === "delivery"){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

module.exports = {verifyToken,verifyTokenAndAuthorization, verifyStore, verifyAdmin, verifyDriver };