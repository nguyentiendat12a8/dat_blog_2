const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/course');


class MeController {
    //[GET] /me/stored/courses

    storedCourses(req, res,next) {
        Promise.all([Course.find({}),Course.countDocumentsDeleted()])
            .then(([courses,deletedCount]) => 
                
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses)
                }))
            
            .catch(()=>{})            
}

    //[GET] me/trash/courses
    trashCourses(req,res,next){
        Course.findDeleted({})
        .then(courses => res.render('me/trash-courses', {
            courses: multipleMongooseToObject(courses)
        }))
        .catch(next)
    }

}

module.exports = new MeController();
