const express = require('express')
const router = express.Router()

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('./data/prove10.json')

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData)
})

router.post('/insertName', (req, res, next) => {
    // Typically you should do some sort of filtering and error checking. This is minimal, and makes sure we're not accepting empty values
    if (req.body.newName !== undefined) {
        const newName = req.body.newName

        // Make our submissions somewhat unique.
        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName }) // Push new object into the dummyData
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }
})

router.get('/', (req, res, next) => {
    res.render('pages/proveAssignments/prove11', {
        title: 'Prove Assignment 11',
        path: '/prove11'
    })
})

module.exports = router