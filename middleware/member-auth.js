const memberModel = require('../model/member-model');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || "Secr3T_Key";

exports.isLoggedIn = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Please login to access the data");
  }
  try {
    const verifiedUser = jwt.verify(token, SECRET_KEY);
    req.user = await memberModel.findById(verifiedUser.id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


exports.isAdmin = async (req, res, next) => {

  const user = await memberModel.findById(req.params.id);
  if (user.userType != 'admin') {
    return res.status(403).send("You must be an admin to acess this route");
  } else {
    return next();
  }
}
