const express = require('express');
const { isLoggedIn, isAdmin } = require("../middleware/member-auth");

//Creating express router
const memberRoute = express.Router();

const { createMember, memberLogin, getMember, getAllMembers } = require('../controller/member-controller');

//Creating register route
memberRoute.post("/register", createMember);

//Creating login routes
memberRoute.post('/login', memberLogin)

//Creating member routes to fetch logged in member data
memberRoute.get('/member/:id', isLoggedIn, getMember)

//Getting all the members registered
memberRoute.get('/allmembers/:id', isLoggedIn, isAdmin, getAllMembers)

module.exports = memberRoute;