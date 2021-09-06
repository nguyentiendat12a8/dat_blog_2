const mongoose = require('mongoose');
const Role = require('../../app/models/role.model')
//const Config = process.env


async function connect() {
    try {
        //await mongoose.connect('mongodb://localhost:27017/dat_blog', {
        await mongoose.connect('mongodb+srv://nguyentiendat12a8:sofm27112000@cluster0.qaz2s.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('connect db successfully!!');
        initial()
    } catch (error) {
        console.log('connect to db failed');
    }
}

function initial(){
    Role.estimatedDocumentCount((err, count)=>{
        if(!err && count === 0){
            new Role({
                name: 'user'
            }).save(err =>{
                if(err){
                    console.log('error' , err)
                }
                console.log("added 'user' to roles collection")
            })

            new Role({
                name: 'moderator'
            }).save(err =>{
                if(err){
                    console.log('error' , err)
                }
                console.log("added 'moderator' to roles collection")
            })

            new Role({
                name: 'admin'
            }).save(err =>{
                if(err){
                    console.log('error' , err)
                }
                console.log("added 'admin' to roles collection")
            })
        }
    })
} 

module.exports = { connect };


