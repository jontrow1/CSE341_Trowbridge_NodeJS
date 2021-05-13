//const PORT = process.env.PORT || 5000
const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
// const path = require('path');
const bookArray = [];
// router.use(express.static(path.join(__dirname, 'public')))
// router.set('view engine', 'ejs');
// router.set('views', 'views');
// router.use(bodyParser.urlencoded( {extended: false}));

router.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/prove02', { 
        pageTitle: 'Prove 02',
        path: '/prove02'
    });
});

router.get('/books', (req, res, next) => {
    res.render('pages/proveAssignments/books', {
        pageTitle: 'Book', 
        books: bookArray,
        path: '/prove02'
    });
});

router.post('/add-book', (req, res, next) => {
    bookArray.push({
        title: req.body.bookTitle,
        author: req.body.bookAuthor,
        summary: req.body.bookSummary
    });
    res.redirect('/proveAssignments/books');
});
// router.listen(5000);
// router.listen(PORT, () => console.log(`Listening on ${ PORT }`));

module.exports = router;