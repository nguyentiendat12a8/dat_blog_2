const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/course');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res,next) {
        Course.find({})
        .then(courses => res.render('me/stored-courses', {
            courses: multipleMongooseToObject(courses)
        }))
        .catch(next)
    }
}

module.exports = new MeController();
