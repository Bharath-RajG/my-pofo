let data = require('../my-data.json')
let express = require('express');
let router = express.Router();


router.get('/', (req, res, next) => {
    res.render('index', {
        layout: 'layout',
        title: 'Album Page',
        navHome: true
    })
})

router.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layout',
        title: 'Contact Page',
        navContact: true
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        layout: 'layout',
        navAbout: true
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


const user = {
    email: "test@test.com",
    password: "test"
}
router.post('/login', (req, res) => {
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

        let data = req.body;

        if (data.email == user.email && data.password == user.password) {

            req.session.isLoggedIn = true;

            res.redirect('/admin/dashboard');
        } else {
            res.render('login', {
                layout: 'layout-signin',
                title: 'Login Page',
                extraCss: '<link rel="stylesheet" href="/css/signin.css">',
                messages: ['Email or Password is wrong']
            });

        }
    }
})

router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;

    res.redirect('/')
})




router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'layout-signin',
        title: 'sign-in',
        extraCss: '<link rel="stylesheet" href="/css/signin.css">'
    })
})

router.post('/signup', (req, res) => {
    var data = req.body;
    console.log(data);

    res.redirect('/login');
})

module.exports = router;











