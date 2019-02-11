let data = require('../my-data.json')
let express = require('express');
let router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('index',{
                layout:'layout',
                title:'Album Page',
                navHome: true
            })
})

router.get('/contact',(req,res)=>{
    res.render('contact',{
        layout:'layout',
        title:'Contact Page',
        navContact: true
    })
})

router.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        layout: 'layout',
        navAbout: true
    })
})

router.get('/login', (req,res)=>{
    res.render('login',{
        layout:'layout-signin',
        title:'Login Page',
        navAdmin: true,
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
})

router.post('/login',(req,res)=>{
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
     res.redirect('/admin/dashboard');
    }
})

router.get('/signup',(req,res)=>{
    res.render('signup',{
        layout:'layout-signin',
        title:'sign-in',
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
})

router.post('/signup',(req,res)=>{
    var data = req.body;
     console.log(data);

     res.redirect('/login',);
})

module.exports = router;











