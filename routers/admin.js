let data = require('../my-data.json')
let express = require('express');
let router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'DashBoard',
        layout: 'layout-admin'
    })
})

router.get('/projects', (req, res) => {
    res.render('admin/project-list', {
        title: 'Project List',
        layout: 'layout-admin',
        projects: data.myProjects
    })
})

router.get('/projects/create', (req, res) => {
    res.render('admin/project-create', {
        title: 'Create New Project',
        layout: 'layout-admin'
    })
})

router.post('/projects/create', (req, res) => {
    let data = req.body;

    console.log(data);
    //logic to save in DB

    res.redirect('/admin/projects')

})

router.get('/projects/:alias', (req, res) => {
    alias = req.params.alias;
    index = data.projectIndex[alias];
    project = data.myProjects[index];
    res.render('admin/project-details', {
        title: 'Project List',
        layout: 'layout-admin',
        project: project,
    })
})

module.exports = router;