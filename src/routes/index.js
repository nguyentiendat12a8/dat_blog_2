const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const auth = require('./auth');
const user = require('./user.routes');
const controller = require('../app/controllers/auth.controller')

const meController = require('../app/controllers/MeController');

function route(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      }); 
    //app.post("/loginAuth", controller.signin)
    app.get("/logout", controller.logout)
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/auth',auth)
    app.use('/user',user)
    app.use('/', siteRouter);
    

}

module.exports = route;
