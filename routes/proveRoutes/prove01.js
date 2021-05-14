const express = require('express');
const fs = require('fs'); // File system for TA01
const router = express.Router();

router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write('<body><h1>Enter a Username</h1><form action="./prove01/create-user" method="POST"><label for="username">Username: </label><input type="text" name="username" id="username"><button type="submit">Send</button></form></body>');
    return res.end();
});

router.get('/users', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
    res.write('</html>');
    return res.end();
});

router.post('/create-user', (req, res, next) => {
    const body = [];
    const name = req.body.username;
    body.push(name)
    const data = body.toString();
    console.log(data);
    //skipping both req.on's - figure out tomorrow
    // req.on('data', chunk => {
    //     body.push(chunk);
    // });
    // req.on('end', () => {
    //     const parsedBody = Buffer.concat(body).toString();
    //     console.log(parsedBody.split('=')[1]);
    // });
    res.statusCode = 302;
    res.setHeader('Location', '/proveAssignments/prove01');
    res.end();
});


// const requestHandler = (req, res) => {
//     const url = req.url;
//     if (url === '/') {
//         res.setHeader('Content-Type', 'text/html');
//         res.write('<html>');
//         res.write('<head><title>Assignment 1</title></head>');
//         res.write('<body><h1>Enter a Username</h1><form action="/create-user" method="POST"><label for="username">Username: </label><input type="text" name="username" id="username"><button type="submit">Send</button></form></body>');
//         res.write('</html>');
//         return res.end();
//     }
//     if (url === '/users') {
//         res.setHeader('Content-Type', 'text/html');
//         res.write('<html>');
//         res.write('<head><title>Assignment 1</title></head>');
//         res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
//         res.write('</html>');
//         return res.end();
//     }
//     if (url === '/create-user') {
//         const body = [];
//         req.on('data', chunk =>{
//             body.push(chunk);
//         });
//         req.on('end', () => {
//             const parsedBody = Buffer.concat(body).toString();
//             console.log(parsedBody.split('=')[1]);
//         });
//         res.statusCode = 302;
//         res.setHeader('Location', '/');
//         res.end();
//     }
// };
module.exports = router;
//exports.handler = requestHandler;