const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/dat_blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('connect db successfully!!');
    } catch (error) {
        console.log('connect to db failed');
    }
}

module.exports = { connect };
