const memberModel = require('../model/member-model');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "Secr3T_Key";

const isLoggedIn = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Please login to access the data");
  }
  try {
    const verifiedUser = jwt.verify(token, SECRET_KEY);
    // req.user = verifiedUser;
    req.user = memberModel.findById(verifiedUser.id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

module.exports = isLoggedIn;