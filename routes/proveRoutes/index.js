const path = require('path');
const routes = require('express').Router();

routes
    .use('/prove01', require('./prove01'))
    .use('/prove02', require('./prove02'))
    .get('/', (req, res, next) => {
        res.render('pages/proveAssignments/', {
            pageTitle: 'Prove Assignments',
            path: '/proveAssignments'
        });
    });

module.exports = routes;