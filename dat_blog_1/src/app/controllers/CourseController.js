const { render } = require('node-sass');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
const course = require('../models/course');
const Course = require('../models/course');

class CourseController {
    //[GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /course/store
    store(req, res, next) {
        //req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(req.body);
        course.save()
        .then(() =>res.redirect('/'))
        .catch(error => {
            
        })
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course =>res.render('courses/edit',{
                course: mongooseToObject(course)
            }))
            .catch(next)
    }
    update(req,res,next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }   


    delete(req,res,next){
        Course.deleteOne({_id: req.params.id},req.body)
            .then(()=> res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController();
