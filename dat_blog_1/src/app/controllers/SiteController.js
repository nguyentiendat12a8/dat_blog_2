const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/course');

class SiteController {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })

            .catch(next);
    }

    //[GET] /search
    show(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
