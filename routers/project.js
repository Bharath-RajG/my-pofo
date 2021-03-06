let data = require('../my-data.json')
let express = require('express');
let router = express.Router();



router.get('/',(req,res)=>{
    
    let projects = data.myProjects;

    res.render('projects',{
        layout:'layout',
        title:'project',
        navProjects: true,
        projects: projects
    })
})

router.get('/:projectAlias',(req,res)=>{
       
        let alias = req.params.projectAlias;
        let index = data.projectIndex[alias];
        let project = data.myProjects[index];
    
        res.render('project-detail',{
            layout:'layout',
            title:'Project-Details',
            project: project
        })
    })

module.exports = router;

