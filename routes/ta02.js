//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const e = require('express');
const express = require('express');
const router = express.Router();

const userArray = ['Jon', 'Heather', 'Oliver', 'Lex', 'Savannah'];
var exists = true;
var dup = false;

router.post('/addUser',(req, res, next) => {
    exists = true;
    dup = false;
    const name = req.body.username;
    const index = userArray.indexOf(name);
    if(index == -1) {
        userArray.push(name);
    } else {
        dup = true;
    };    
    res.redirect('/ta02');
});

router.post('/removeUser',(req, res, next) => {
    exists = true;
    dup = false;
    const name = req.body.removal;
    const index = userArray.indexOf(name);
    if(index !== -1) {
        userArray.splice(index, 1);
    } else {
        exists = false;
    };
    
    res.redirect('/ta02');
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02',
        users: userArray, 
        exists: exists,
        dup: dup,
        path: '/ta02', // For pug, EJS 
        activeTA02: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;