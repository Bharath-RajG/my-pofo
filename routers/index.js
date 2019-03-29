let data = require('../my-data.json')
let express = require('express');
let router = express.Router();
let userService = require('../service/userService')
let contactService = require('../service/contactService')

router.get('/', (req, res, next) => {
    res.render('index', {
        layout: 'layout-index',
        title: 'Portfolio',
        navHome: true,
        indexCss:  '<link rel="stylesheet" type="text/css" href="css/main.css">', 
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'layout',
        navAbout: true
    })
})

router.get('/contact', (req, res) => {
    
    res.render('contact', {
        layout: 'layout',
        title: 'Contact Page',
        navContact: true
    })
})

router.post('/contact', (req, res, next) => {
    


    let data = req.body;

    function contactCreate(err,data) {
        if(err) {
            next(err)
        }else {
            res.redirect('/projects')
        }
    }

    contactService.createContact(data, contactCreate)


   
})



router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'layout-signin',
        title: 'Login Page',
        navAdmin: true,
        extraCss: '<link rel="stylesheet" href="/css/signin.css">'
    })
})

/* 1 or 2 admin id's*/
const users = [
    {
        name: 'Bharath',
        email: "test@test.com",
        password: "test"
    }
    ,
    {
        name: 'raj',
        email: "raj@test.com",
        password: "raj"
    }
]
router.post('/login', (req, res) => {
    /*validate the email and password and display error messages */
    req.checkBody('email', 'Email is Required').isEmail().withMessage('Invalid Email');
    req.checkBody('password', 'Password is required').notEmpty().withMessage('Password is required').isLength({ min: 3 }).withMessage('Length should be min 3');

    var errors = req.validationErrors();

    if (errors) {
        let msgs = errors.map(ele => ele.msg);

        res.render('login', {
            layout: 'layout-signin',
            title: 'Login Page',
            navAdmin: true,
            extraCss: '<link rel="stylesheet" href="/css/signin.css">',
            messages: msgs
        });
    }else {
        let data = req.body;
       
        
        function userLogin (err ,data) {
            if(err) {
                res.render('login', {
                    title:'Login',
                    layout:'layout-signin',
                    extraCss:'<link rel="stylesheet" href="/css/signin.css">',
                    messages: data
                });
            }else {
                req.session.isLoggedIn = true;
                req.session.user = data
                res.redirect('/admin/dashboard')
            }
        }

        userService.login(data, userLogin)

    }
})


router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/')
})

/* new user signup page*/
router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'layout-signin',
        title: 'sign-in',
        extraCss: '<link rel="stylesheet" href="/css/signin.css">'
    })
})

router.post('/signup', (req, res) => {
    let data = req.body;
    
    function signIn (err, data) {
        if(err) {
            next(err)
        }else {
            res.redirect('/login')
        }
    }
    userService.create(data, signIn)
})

module.exports = router;











