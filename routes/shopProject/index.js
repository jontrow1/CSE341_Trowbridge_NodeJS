// const PORT = process.env.PORT || 3000
// const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

// const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://jonathan:jonmongodb@cluster0.s3icc.mongodb.net/shop?retryWrites=true&w=majority';

const app = express.Router();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();
const flash = require('connect-flash');

// app.set('view engine', 'ejs');
// app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const { result } = require('underscore');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));


app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res, next) => {
    res.render('pages/shopProject/', {
        pageTitle: 'Shop Project',
        path: '/shopProject'
    });
});

// app.use(errorController.get404);

mongoose.connect(MONGODB_URI,{useUnifiedTopology: true})
    .then(result => {          
        //app.listen(3000);
        // app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
    }).catch(err => {
        console.log(err);
    });

module.exports = app;