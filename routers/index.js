let data = require('../my-data.json')
let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        layout: 'layout-index',
        title: 'Portfolio',
        navHome: true
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
    } else {
        /* here useing the 2 validaate users */
        let data = req.body;
        let foundUser = users.filter(user => data.email == user.email && data.password == user.password)
        if (foundUser.length > 0) {

            req.session.isLoggedIn = true;
            req.session.user = foundUser[0];
            res.redirect('/admin/dashboard')

        } else {
            res.render('login', {
                title: 'Login',
                layout: 'layout-signin',
                extraCss: '<link rel="stylesheet" href="/css/signin.css">',
                messages: ['Email or Password Wrong']
            });
        }
        /*
                req.session.user = user;
                var foundUser;
                for(var i=0;i < user.length;i++)
                {
                    if (user[i].email == data.email && user[i].password == data.password) {
                        foundUser = user[i]
                    }
                }
                
                //console.log('foundUser:',foundUser)
                if (foundUser) {
                   
                    req.session.isLoggedIn = true;
                     req.session.user = foundUser[0];
                    res.redirect('/admin/dashboard');
                } else {
                    res.render('login', {
                        layout: 'layout-signin',
                        title: 'Login Page',
                        extraCss: '<link rel="stylesheet" href="/css/signin.css">',
                        messages: ['Email or Password is wrong']
                    });
         }*/
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
    var data = req.body;
    //console.log(data);
    res.redirect('/login');
})

module.exports = router;











