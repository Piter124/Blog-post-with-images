const router = require("express").Router();
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const multer     = require('multer');
const path = require("path");
const uuid4 = require("uuid").v4;
const fs = require("fs");

//set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/' );
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
    //filter file when it is needed
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

router.get("/blog", async (req, res) => {
  const allBlogs = await Blog.find();
  res.render("blog", { blogs: allBlogs });
});

router
  .get("/blog/:id", async (req, res, next) => {
    const getBlog = await Blog.findOne({ _id: req.params.id });
    console.log(getBlog);
    res.render("particularBlog", { blog: getBlog });
    })

router.get("/delete/:id", async (req, res, next) => { 
    const getBlog = await Blog.findOne({ _id: req.params.id })
      fs.unlink('uploads/' + getBlog.image, () => {
        Blog.deleteOne({ _id: req.params.id })
      .then(result => {
        console.log(result);
        console.log("Deleted blog successfully!");
        res.redirect("/blog");
      })
      })  
    })  

  .get("/edit/:id", async (req, res, next) => {
    const getData = await Blog.findOne({ _id: req.params.id });
    res.render("editBlog", { blog: getData });
  })

  router.post("/edit/:id", upload.single('image'), async (req, res, next) => {
    const title = req.body.title; 
    const content = req.body.content; 
    const image = req.file.filename;


    Blog.updateOne({ _id: req.params.id },  {
      $set: { 
        title,
        content,
        image
      }
    },
    {new: true}
    )
      .then(() => {
        console.log("successfully! updated the blog!");
        res.redirect("/blog");
      })
      .catch((err) => console.log(err));
  });
module.exports = router;
