let data = require('../my-data.json')
let express = require('express');
let router = express.Router();



router.get('/', (req,res)=>{
    let random = Math.floor(Math.random() * data.myBlog.length);
     let nav = data.blogCategories;
     let project = data.myBlog;
    
     res.render('blog',{
         layout:'layout',
         title:'blogs',
         navBlog: true,
         blog: project,
         catagories: nav,
         featuredBlog:data.myBlog[random],
         blogCss:'<link rel="stylesheet" href="/css/blog.css">'
     })
 })
module.exports = router;