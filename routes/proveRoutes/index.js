const express = require('express');
const routes = express.Router();

routes
    .use('/prove01', require('./prove01'))
    .use('/prove02', require('./prove02'))
    .use('/prove08', require('./prove08'))
    .use('/prove09', require('./prove09'))
    .use('/prove10', require('./prove10'))
    .get('/', (req, res, next) => {
        res.render('pages/proveAssignments/', {
            pageTitle: 'Prove Assignments',
            path: '/proveAssignments'
        });
    });

module.exports = routes;