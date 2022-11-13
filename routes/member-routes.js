const express = require('express');
const isAuthenticated = require("../middleware/member-auth")

//Creating express router
const memberRoute = express.Router();

const { createMember, memberLogin, getMember } = require('../controller/member-controller');

//Creating register route
memberRoute.post("/register", createMember);

//Creating login routes
memberRoute.post('/login', memberLogin)

//Creating member routes to fetch members data
memberRoute.get('/member', isAuthenticated, getMember)

module.exports = memberRoute;