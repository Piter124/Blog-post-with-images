
'use strict';

//used to mongoose.connect
function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, 
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}

const mongoose = require("mongoose");
const appEnv = require("../getenv");

//hcb-mongodb naming convention from manifest.yml
var mongodbConfig = appEnv.getService(/hcb-mongodb/);

//Gets the Service credentials from vcap-local.json 
//var mongoHost = mongodbConfig.credentials.connection.mongodb.hosts[0].hostname;
//var mongoPort = mongodbConfig.credentials.connection.mongodb.hosts[0].port;
var mongoURI  = mongodbConfig.credentials.connection.mongodb.composed[0];
var mongoCERT = Buffer.from(mongodbConfig.credentials.connection.mongodb.certificate.certificate_base64, 'base64').toString('utf-8');

//Detects environment and connects to appropriate DB
if(mongodbConfig.isLocal){
    var ca = mongoCERT;
    mongoDbOptions = {
        useNewUrlParser: true,
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
  };
  mongoose.connect('mongodb+srv://piotr:zwxgZllQkdlXujeB@cluster0.zoo9v.mongodb.net/node-angular?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
        .then(res => console.log("Connected to mongodb instance"))
        .catch(function (reason) {
            console.log('Unable to connect to the mongodb instance. Error: ', reason);
        });
    var sessionDB = mongoURI;
    console.log('Your MongoDB is running at ' + unicodeToChar(mongoURI));
}

// Connect to MongoDB Service on IBM Cloud
else if(!mongodbConfig.isLocal) {
    var mongoURI, mongoDbOptions = {};
    //var mongoDbCredentials = mongodbConfig;
    var ca = mongoCERT;
    var mongoDbUrl = mongoURI;
    var mongoDbOptions = {
        useNewUrlParser: true,
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        poolSize: 1,
        reconnectTries: 1,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    };

    console.log("Your MongoDB is running at ", mongoURI);
    // connect to our database
    mongoose.Promise = global.Promise;
    mongoose.connect(unicodeToChar(mongoURI), mongoDbOptions)
        .then(res => console.log("Connected to mongodb instance."))
        .catch(function (reason) {
            console.log('Unable to connect to the mongodb instance. Error: ', reason);
        });
    //mongoose.connect(mongoURI, mongoDbOptions); // connect to our database
    sessionDB = mongoURI;
}
else{
    console.log('Unable to connect to MongoDB.');
}


// Model BlogSchema
const BlogSchema =  mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedAt: {
    type: String,
    default: new Date(),
  },
  image: {
    type: String,
    default: "None"
  }
});

module.exports = new mongoose.model("Blog", BlogSchema);
