const express = require('express');
const tasksRouter = express.Router();
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'tasks',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

tasksRouter.get('/', (req, res) => {
    console.log('in GET route...');
    let queryText = 
    `
    SELECT * FROM "tasks";
    `
    pool.query(queryText)
        .then(results => {
            console.log(results);
            res.send(results.rows)
        }).catch( err => {
            console.log('error in GET', err);
            res.sendStatus(500);
        });
});


module.exports = tasksRouter;