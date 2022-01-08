
const db = require('../models')
const User = db.user
const Role = db.role

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const { findById } = require('../models/course')



//const config = require('../../config/auth')
const Config = process.env
exports.login = (req, res) => {
    res.render('login')
}
exports.signup = (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    user.save((err, user) => {
        if (err) {
            return res.status(500).send({ message: err })
        }

        if(req.body.roles){
        Role.find({
            name: { $in: req.body.roles }
        }, (err, roles) => {
            if (err) {
                return res.status(500).send({ message: err })
            }
            user.roles = roles.map(role => role._id)
            user.save(err => {
                if (err) {
                    return res.status(500).send({ message: err })
                }
                res.send({ message: 'User was registered successfully' })
            })
        })
        } 
            else {
                Role.findOne({name: 'user'},(err,role)=>{
                    if(err){

                        return res.status(500).send({message: err})
                    }
                    user.roles = [role._id];
                    user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                    });
          });
        }
    });
};


exports.signin = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!(username && password)) {
            res.status(400).send({
                error: true,
                message: 'All input is required'
            })
        }
        const user = await User.findOne({ username: username })
        if (!user) {
            res.status(404).send({ error: true, message: 'User not found ~~~' })
        }

        if (await (bcrypt.compareSync(password, user.password))) {
            const token = jwt.sign({ id: user._id }, Config.TOKEN_KEY, {
                expiresIn: Config.tokenLife
            })
            const refreshToken = jwt.sign({id: user._id}, Config.REFRESH_TOKEN_KEY,{
                expiresIn: Config.refreshTokenLife
            })
            const userRole = await Role.findById(user.roles).then(response =>{
                return response.name 
            })
            return res.send({
                token: token,
                user: userRole
            })

            

            // return res
            // .cookie('access_token',token, {
            //     httpOnly: true,//cookie chi duoc set tu ben server
            //     //secure: process.env.NODE_ENV === "production", //trinh duyet phai duoc ket noi bao mat https
            // })

            // .cookie('refresh_token',refresh,{
            //     httpOnly: true
            // })
            //.status(200)
            // .redirect('/')

        } else {
            return res.status(400).send({ message: 'Invalid Credentials, password' })
        }
    } catch (err) {
        return console.log(err)
    }
}

exports.verifyToken = async (req, res, next) => {

}

exports.logout = (req, res) => {
    return res.clearCookie('access_token').redirect('/')
}

