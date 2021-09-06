
const db = require('../models')
const User = db.user
const Role = db.role

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')



//const config = require('../../config/auth')
const Config = process.env

exports.signup = (req,res) =>{

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    })

    user.save((err,user) => {
        if(err){
            return res.status(500).send({message: err})
        }

        if(req.body.roles){
            Role.find({
                name: {$in : req.body.roles}
            }, (err,roles) => {
                if(err){
                    return res.status(500).send({message: err})
                }
                user.roles = roles.map(role => role._id)
                user.save(err =>{                   
                    if(err){
                        return res.status(500).send({message: err})
                    }

                    res.send({message: 'User was registered successfully'})
                })
            })
        } else {
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
  //res.render('login1')
};


exports.signin = async (req,res) => {
try{
    const {username, password} = req.body
    if (!(username && password)){
        res.status(400).send('All input is required')
    }
    const user = await User.findOne({username: username})
    if (!user){
        res.status(404).send({message: 'User not found ~~~'})
    }

    if (await (bcrypt.compareSync(password,user.password))){
        const token = jwt.sign({id: user._id}, Config.TOKEN_KEY,{
            expiresIn: 86400
        })
    
        var authorities = []

        //join data to diffirent colection .populate()
        User.findOne().populate('roles').exec(function(err,user){
            if(err){
                return res.status(500).send({message: err})
            }
            authorities.push('ROLE_'+ user.roles[0].name.toUpperCase())
            // for(let i = 0; i < user.roles.length; i++){
            //     authorities.push('ROLE_'+ user.roles[i].name.toUpperCase())         
            // }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
       
    } else {
        res.status(400).send('Invalid Credentials, password')
    }
    
    // const passwordIsValid = await bcrypt.compareSync(password, user.password)
    // if (!passwordIsValid){
    //     res.status(401).send({message: 'Password is invalid'})
    // }



} catch(err) {
    console.log(err)
}
    


    // User.findOne({
    //     username: req.body.username
    // })
    // //.populate('roles','-__v')
    // .exec((err,user)=>{
    //     if(err){
    //         return res.status(500).send({message: err})
    //     }

    //     if(!user) {
    //         res.status(404).send({message: 'User not found~~'})
    //     }

    //     var passwordIsValid = bcrypt.compareSync(
    //         req.body.password,
    //         user.password
    //     )

    //     if(!passwordIsValid){
    //         return res.status(401).send({
    //             accessToken: null,
    //             message: 'Invalid password!~~'
    //         })
    //     }

    //     var token = jwt.sign({id: user.id}, Config.TOKEN_KEY,{
    //         expiresIn: 86400
    //     })

        

    //     var authorities = []

    //     for(let i = 0; i < user.roles.length; i++){
    //         authorities.push('ROLE_'+ user.roles[i].name.toUpperCase())         
    //     }
    //     res.status(200).send({
    //         
    //     })
    // })

}

