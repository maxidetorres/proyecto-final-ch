const mongoose = require('mongoose')
const config = require('config')
module.exports.createConnectionMongoDb = () => {
    mongoose.connect(
        `mongodb+srv://${config.get('mongo.username')}:${config.get('mongo.password')}@${config.get('mongo.cluster')}.mongodb.net/${config.get('mongo.dbname')}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully to Mongo atlas....")
    });
    
}
