mongoose = require('mongoose');

module.exports = {
    connect: DB_URL => {

        // mongoose.set('useNewUrlParser', true);
        // mongoose.set('useFindAndModify', false);
        // mongoose.set('useCreateIndex', true);
        // mongoose.set('useUnifiedTopology', true);
        mongoose.connect(DB_URL)
        .then(() => console.log("Successfully connect to MongoDB."))
        
        //Log an error if we fail to connect
        .catch((err) => {
            console.error(err);
            console.log(
            'MongoDB connection failed: ' + DB_URL
        );



        process.exit();

        });
    },

    //close the connection
    close: () => {
        mongoose.connection.close();
    }
};