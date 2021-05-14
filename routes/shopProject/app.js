const PORT = process.env.PORT || 3000
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('609a3e3f53487b31943accf9')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://jonathan:jonmongodb@cluster0.s3icc.mongodb.net/shop?retryWrites=true&w=majority',{useUnifiedTopology: true})
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Jon',
                    email: 'jontrow1@gmail.com',
                    cart: {
                        items:[]
                    }
                });
                user.save();
            }
        });        
        //app.listen(3000);
        app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
    }).catch(err => {
        console.log(err);
    });