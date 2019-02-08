module.exports.logger = (req,res,next)=>{
     console.log(`${req.method} ${req.url}`);
     next();
}

module.exports.notFoundError = (req,res,next)=>{
         res.render('404',{
             layout:'layout',
             title:'Page not found'
         })
}

module.exports.handleError = (err,req,res,next)=>{
        console.log(err)
         res.render('500',{
             layout:'layout',
             title:'Something went wrong'
         })
}