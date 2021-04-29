const router = require("express").Router();
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const path = require("path");
const multer     = require('multer');
const fs = require('fs');


//set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);        
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, //5mb file
  fileFilter: function (req, file, cb) {
    
    const fileTypes = /png|jpeg|jpg/;
    const extName = fileTypes.test(path.extname(file.originalname));
    file.originalname.toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb("Error: only png, jpeg, and jpg are allowed!");
    }
  },
});

router
  .get("/compose", async (req, res) => {
    res.render("composeBlog");
  })

  .post("/compose", upload.single('image'), async (req, res, next) => {
      console.log("start saving...");

      const newBlog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title, 
        content: req.body.content, 
        image:  req.file.filename,
      });
   
    newBlog
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json();
        console.log("Blog Saved Successfully!");
        res.redirect("/");
      })
        .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  

module.exports = router;
