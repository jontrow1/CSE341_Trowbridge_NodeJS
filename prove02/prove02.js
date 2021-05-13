const PORT = process.env.PORT || 5000
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const bookArray = [];

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded( {extended: false}));

app.get('/', (req, res, next) => {
    res.render('index', { pageTitle: 'Add Book'});
});

app.get('/books', (req, res, next) => {
    res.render('books', {pageTitle: 'Book', books: bookArray});
});

app.post('/add-book', (req, res, next) => {
    bookArray.push({
        title: req.body.bookTitle,
        author: req.body.bookAuthor,
        summary: req.body.bookSummary
    });
    res.redirect('/books');
});

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found', path: '/404'});
})

// app.listen(5000);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

