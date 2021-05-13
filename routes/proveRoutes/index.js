const routes = require('express').Router();

routes
    .use('/prove01', require('./prove01'))
    .use('/prove02', require('./prove02'))
    .get('/', (req, res, next) => {
        res.render('pages/proveActivities/', {
            pageTitle: 'Prove Activities',
            path: '/proveActivities'
        });
    });

module.exports = routes;