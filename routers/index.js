let data = require('../my-data.json')

module.exports.index = (req,res)=>{
    res.render('index',{
        layout:'layout',
        title:'Album Page',
        navHome: true
    })
}
module.exports.projectDetail = (req,res)=>{
       
    let alias = req.params.projectalias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];

    res.render('project-detail',{
        layout:'layout',
        title:'Project-Details',
        project: project
    })
}
module.exports.projects = (req,res)=>{
    
    let projects = data.myProjects;

    res.render('projects',{
        layout:'layout',
        title:'project',
        navProjects: true,
        projects: projects
    })
}

module.exports.blogs = (req,res)=>{
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
}

module.exports.contact = (req,res)=>{
    res.render('contact',{
        layout:'layout',
        title:'Contact Page',
        navContact: true
    })
}

module.exports.login = (req,res)=>{
    res.render('login',{
        layout:'layout-signin',
        title:'Login Page',
        navAdmin: true,
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
}

module.exports.doLogin = (req,res)=>{
       req.checkBody('email','Email is Required').isEmail().withMessage('Invalid Email');

       req.checkBody('password','Password is required').notEmpty().withMessage('Password is required').isLength({min:5}).withMessage('Length should be min 5');

       var errors = req.validationErrors();

       if(errors){
           let msgs = errors.map(ele => ele.msg);
            
        res.render('login',{
            layout:'layout-signin',
            title:'Login Page',
            navAdmin: true,
            extraCss:'<link rel="stylesheet" href="/css/signin.css">',
            messages: msgs
        }); 
       }else{
        res.redirect('/dashboard');
       }
}

module.exports.signup = (req,res)=>{
    res.render('signup',{
        layout:'layout-signin',
        title:'sign-in',
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
}

module.exports.doSignup = (req,res)=>{
    var data = req.body;
     console.log(data);

     res.redirect('/login',);
}

/*admin*/
module.exports.dashboard = (req,res)=>{
    res.render('admin/dashboard',{
        title:'DashBoard',
        layout:'layout-admin'
    })
}

module.exports.adminProjectList = (req,res)=> {
    res.render('admin/project-list',{
        title:'Project List',
        layout:'layout-admin',
        projects: data.myProjects
    })
}