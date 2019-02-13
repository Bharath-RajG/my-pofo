const express = require('express');
const hbs = require('hbs');
const bodyparser = require('body-parser');
const expressValidtor = require('express-validator');
/* USE Session */
const session = require('express-session');

const index = require('./routers/index');
const project = require('./routers/project');
const blog = require('./routers/blog');
const admin = require('./routers/admin');

const appMiddle = require('./middleware/appMiddleWare.js');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

/* USE Session */
app.use(session({
    secret:'my secret',
    resave: false,
    saveinitilized: false,
    cookie:{maxAge:1000000}
}))

app.use(expressValidtor());

app.set('views',__dirname+'/views');
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('increment', function(value, options){
    return value+1;
});

app.use(express.static(__dirname+'/static'))
app.use(appMiddle.logger);

function auth(req,res,next){
    var loggedIn = req.session.isLoggedIn;
    console.log(loggedIn);
    if(loggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}

app.use('/', index);
app.use('/projects', project);
app.use('/blogs', blog);
app.use('/admin', auth, admin);

app.use(appMiddle.notFoundError);
app.use(appMiddle.handleError);

app.listen(3002, ()=> console.log('Server started on port 3002'));