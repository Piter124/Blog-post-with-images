// const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://piotr:zwxgZllQkdlXujeB@cluster0.zoo9v.mongodb.net/node-angular?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })

mongoose.connect(
    'mongodb+srv://piotr:zwxgZllQkdlXujeB@cluster0.zoo9v.mongodb.net/node-angular?retryWrites=true&w=majority',
  
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
   },
    () => {
      console.log("Connection to mongodb database was successful!");
    },
    err => {
      console.log("Something went wrong with connection to mongodb database")
    }
  );