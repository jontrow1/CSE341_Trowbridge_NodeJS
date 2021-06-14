const model = require('../model/prove09');

exports.getPokemon = (pageNum, callback) => {
    // Page 1 will have an offset of 0
    const offset = 10 * (pageNum - 1);
    model.getPokemon(offset, (data) => {
        callback(data);
    });
    
}

// const https = require('https')

// exports.getPokemon = (req, res, next) => {
//     https.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10', (resp) => {
//         let data = '';

//         resp.on('data', (chunk) => {
//             data += chunk;
//         });

//         resp.on('end', function () {
//             global.jsonResponse = JSON.parse(body)
//             renderIndex(req, res, global.jsonResponse)
//             console.log(jsonResponse)
//         })
//     })
//     .on('error', function (e) {
//         console.log('Got an error: ', e)
//     })
// }