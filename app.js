const express = require('express');
const hbs = require('hbs');
const bodyparser = require('body-parser');
/*useing Express validator*/
const validtor = require('express-validator');
/* USE Session */
const session = require('express-session');
/*exporting the Modules form routers*/
const index = require('./routers/index');
const project = require('./routers/project');
const blog = require('./routers/blog');
const admin = require('./routers/admin');
/*using the middleware*/
const appMiddle = require('./middleware/appMiddleWare.js');
/*express the framework*/
const app = express();


/*middleware.Parse incoming request bodies in a middleware before your handlers*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

/* USE Session */
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000000 }
}))


app.use(validtor());

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
/*index value increment in project details*/
hbs.registerHelper('increment', function (value, options) {
    return value + 1;
});

app.use(express.static(__dirname + '/static'))
/*middleWare*/
app.use(appMiddle.logger);
app.use(appMiddle.authenticated);

app.use('/', index);
app.use('/projects', project);
app.use('/blogs', blog);
app.use('/admin', appMiddle.authenticate, admin);

app.use(appMiddle.notFoundError);
app.use(appMiddle.handleError);

app.listen(3002, () => console.log('Server started on port 3002'));