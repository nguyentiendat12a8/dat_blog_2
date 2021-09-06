const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 8001;

require('dotenv').config() 

const route = require('./routes');

const db = require('./config/db');

const cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))

//connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//xu ly du lieu tu form submit len sv
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


app.use(methodOverride('_method'))
//http logger
//app.use(morgan('combined'))

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers:{
            sum: (a,b) =>a+b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/resources/views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


