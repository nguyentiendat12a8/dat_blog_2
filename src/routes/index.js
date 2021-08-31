const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const auth = require('./auth');
const user = require('./user.routes');

function route(app) {


    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/login',auth)
    app.use('/user',user)
    app.use('/', siteRouter);

}

module.exports = route;
