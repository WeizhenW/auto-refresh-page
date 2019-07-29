const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
//route to get all restaurants
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "wait_time"`)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error with get time', error);
            res.sendStatus(500);
        })
})





module.exports =router;