module.exports.logger = (req,res,next)=>{
     console.log(`${req.method} ${req.url}`);
     next();
}
/*to display error message whe page not found*/
module.exports.notFoundError = (req,res,next)=>{
         res.render('404',{
             layout:'layout',
             title:'Page not found'
         })
}
/*to display error message when entered or clicked */
module.exports.handleError = (err,req,res,next)=>{
        console.log(err)
         res.render('500',{
             layout:'layout',
             title:'Something went wrong'
         })
}

 /*middleware for session*/
module.exports.authenticate = (req,res,next)=>{
    var loggedIn = req.session.isLoggedIn;
    console.log(loggedIn);
    if(loggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports.authenticated = (req,res,next)=>{
    req.session.isLoggedIn = req.session.isLoggedIn ? true : false;
    //console.log(req.session);
    if(req.session.isLoggedIn){
        res.locals.user = req.session.user;
        next();

    }else{
        next();
    }
}
