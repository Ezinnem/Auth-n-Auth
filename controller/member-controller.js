//Requiring all the necessary files and libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const memberModel = require('../model/member-model');

const SECRET_KEY = process.env.SECRET_KEY || "Secr3T_Key";

const JWT_EXPIRE = process.env.JWT_EXPIRE || "10d"


exports.createMember = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        //Check emptyness of the incoming data
        if (!name || !email || !password) {
            return res.json({ message: 'Please enter all the details correctly' })
        }

        //Check if the member already exist or not
        const memberExist = await memberModel.findOne({ email: req.body.email });
        if (memberExist) {
            return res.json({ message: 'The member already exist with the given email address' })
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const member = new memberModel(req.body);
        await member.save();
        const token = await jwt.sign({ id: member._id }, SECRET_KEY, {
            expiresIn: JWT_EXPIRE,
        });
        return res.cookie({ 'token': token }).json({ success: true, message: 'A new member registered successfully', data: member })
    } catch (error) {
        return res.json({ error: error });
    }
};

exports.memberLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Check emptyness of the incoming data
        if (!email || !password) {
            return res.json({ message: 'Please enter all the details correctly' })
        }
        //Check if the member already exist or not
        const memberExist = await memberModel.findOne({ email: req.body.email });
        if (!memberExist) {
            return res.json({ message: 'Wrong credentials' })
        }
        //Check password match
        const isPasswordMatched = await bcrypt.compare(password, memberExist.password);
        if (!isPasswordMatched) {
            return res.json({ message: 'Wrong credentials has been entered.' });
        }
        const token = await jwt.sign({ id: memberExist._id }, SECRET_KEY, {
            expiresIn: JWT_EXPIRE,
        });
        return res.cookie({ "token": token }).json({ success: true, message: 'LoggedIn Successfully', token: token, id: memberExist._id })
    } catch (error) {
        return res.json({ error: error });
    }
};

exports.getMember = async (req, res) => {
    try {
        const member = await memberModel.findById(req.params.id);
        if (!member) {
            return res.json({ message: 'No member found' })
        }
        return res.json({ member: member })
    } catch (error) {
        return res.json({ error: error });
    };
}

exports.getAllMembers = async (req, res) => {
    try {
        const member = await memberModel.find();
        if (!member) {
            return res.json({ message: 'No member found' })
        }
        return res.json({ member: member })
    } catch (error) {
        return res.json({ error: error });
    };
}
