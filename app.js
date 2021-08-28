const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
// require('./db/mongoose')


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use(require("./routes/index"))
app.use(require("./routes/compose"))
app.use(require("./routes/blog"))
app.use(require('./routes/user'))
app.use(require('./routes/task'))


app.use('/uploads', express.static('uploads'));

// server configurations are here....
app.listen(3000, () => console.log("Server started listening on port: 3000"));

const Task = require ('./models/task')
const User = require('./models/user')

const main = async () => {
    //find user by task
    //const task = await Task.findbyId('')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

//find tasks by user 
    const user = await user.findById('')
    await user.populet('tasks').execPopulate()
    console.log(user.tasks)
}
main()