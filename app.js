const express = require('express');
const hbs = require('hbs');
const bodyparser = require('body-parser');
const expressValidtor = require('express-validator');
const routers = require('./routers/index')
const appMiddle = require('./middleware/appMiddleWare.js');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(expressValidtor());

app.set('views',__dirname+'/views');
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('increment', function(value, options){
    return value+1;
});

app.use(express.static(__dirname+'/static'))
app.use(appMiddle.logger);

app.get('/', routers.index);

app.get('/projects', routers.projects)
app.get('/project/:projectalias', routers.projectDetail);

app.get('/contact', routers.contact);

app.get('/blogs', routers.blogs);
app.get('/about', routers.about);

app.get('/login', routers.login);
app.post('/login', routers.doLogin);

app.get('/signup', routers.signup);
app.post('/signup', routers.doSignup);

/*admin*/

app.get('/dashboard', routers.dashboard);
app.get('/admin/projects', routers.adminProjectList);
app.get('/admin/projects/:alias', routers.adminProjectDetails);

app.use(appMiddle.notFoundError);
app.use(appMiddle.handleError);

app.listen(3002, ()=> console.log('Server started on port 3002'));