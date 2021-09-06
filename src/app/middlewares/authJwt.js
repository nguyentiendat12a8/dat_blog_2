const jwt = require('jsonwebtoken')
const config = process.env
const db = require('../models')
const User = db.user
const Role = db.role



verifyToken = (req,res,next) =>{
    let token = req.headers["x-access-token"];

    // if(!token){
    //    return res.render('login')
    // }

    jwt.verify(token, config.TOKEN_KEY, (err,decoded)=>{
        if(err){
            return res.status(401).send({message:'Unauthorized!'})   
        }
        req.userId = decoded.id
        next()
    })
}

isAdmin = (req,res,next) =>{
    User.findById(req.userId).exec((err,user) =>{
        if(err){
            return res.status(500).send({message: err})
        }

        Role.find({
            _id: {$in : user.roles}
        },
        (err, roles) =>{
            if(err){
                res.status(500).send({message: err})
                return
            }

            for(let i = 0; i < roles.length; i++){
                if(roles[i].name ==='admin'){
                    next()
                    return
                }
            }
            
            res.status(403).send({message: 'Require admin role!'})
            return  
        })
            
    })
}

isModerator = (req,res,next) =>{
    User.findById(req.userId).exec((err,user) =>{
        if(err){
            return res.status(500).send({message: err})
        }

        Role.find({
            _id: {$in : user.roles}
        },
        (err, roles) =>{
            if(err){
                res.status(500).send({message: err})
                return
            }

            for(let i = 0; i < roles.length; i++){
                if(roles[i].name ==='moderator'){
                    next()
                    return
                }
            }
            
            res.status(403).send({message: 'Require Moderator role!'})
            return  
        })
            
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator

}

module.exports = authJwt
