const express = require('express');
const app = express.Router();

const controller = require('./controllers/prove09');

app.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/welcome', {
        path: '/welcome',
        title: 'Pokemon Activity'
    });
})
.get('/:page', (req, res, next) => {
    const page = req.params.page;
    controller.getPokemon(page, (pokemon) => {
            res.render('pages/proveAssignments/prove09', {
                pokemonList: pokemon,
                path: '/prove09',
                title: 'Pokemon List',
                page: page
            });
    });
});

module.exports = app;

// const express = require('express');

// const prove09Controller = require('./controllers/prove09');
// const router = express.Router();

// router.get('/pokemon/:page', prove09Controller.getPokemon);
      
// module.exports = router;