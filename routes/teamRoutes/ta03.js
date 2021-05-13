//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const https = require('https');
const _ = require('underscore');

router.get('/',(req, res, next) => {
    const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
    https.get(url, res2 => {
        let data = "";
        res2.on("data", (chunk) => {
            data += chunk;
        });
        res2.on("end", () => {
            try {
                const json = JSON.parse(data);
                res.render('pages/teamActivities/ta03', { 
                    title: 'Team Activity 03', 
                    catalog: json,
                    path: '/ta03' 
                  });
            } catch (error) {
                console.error(error.message);
            };
        });
    }).on("error", (error) => {
       console.error(error.message);
    });    
});

module.exports = router;