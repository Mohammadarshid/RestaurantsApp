
const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.mongoURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    console.log(`Connected To Database ${mongoose.connection.host} `.bgBlue);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectdb; 