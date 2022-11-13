const memberModel = require('../model/member-model');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || "KGGK>HKHVHJVKBKJKJBKBKHKBMKHB";

const isAuthenticated = async (req, res, next) => {

    console.log(req.cookie, 'this is the req')
    try {
        const  token  = req.cookie;
        console.log(token)
        if (!token) {
            return next('Please login to access the data');
        }

        const verify = await jwt.verify(token, SECRET_KEY)
        req.member = await memberModel.findById(verify.id);
        next();
    } catch (error) {
        return next(error);
    }
}

module.exports = isAuthenticated;