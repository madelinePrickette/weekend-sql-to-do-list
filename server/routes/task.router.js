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

tasksRouter.post('/', (req, res) => {
    console.log('in POST route...');
    let queryText = 
    `
    INSERT INTO "tasks" ("task")
    VALUES ($1);
    `
    let queryValues = [
        req.body.task,
    ];
    console.log(req.body); //shows in vs code terminal
    pool.query(queryText, queryValues)
        .then( (result) => {
            res.sendStatus(200);
        }).catch( (err) => {
            console.log('Error in POST...', err);
            res.sendStatus(500);
        });
});

tasksRouter.delete('/:id', (req, res) => {
    console.log('in DELETE route...');
    const id = req.params.id
    console.log(id); //check
    
    let queryText = 
    `
    DELETE FROM "tasks"
    WHERE "id" = $1;
    `
    pool.query(queryText, [id])
        .then( (result) => {
            res.sendStatus(200)
        }).catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

tasksRouter.put('/:id', (req, res) => {
    const id = req.params.id
    console.log(id);

    let queryText = 
    `
    UPDATE "tasks"
    SET "status" = true
    WHERE "id" = $1;
    `;
    pool.query(queryText, [id])
        .then( (result) => {
            console.log(result);
            res.sendStatus(200);
        }).catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        });
});


module.exports = tasksRouter;