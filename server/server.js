const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//connection from pool.js
const pool = require('./modules/pool');


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))


app.post('/tasks', (req, res) => {
    console.log('yay');
    //res.send('yay now the post is in the console');
})

app.get('/tasks', (req, res) => {
    console.log('omg the get route works');
    //res.send('omg the get route works in the DOM console');
    const queryGetTasks = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryGetTasks).then(result => {
    res.send(result.rows);
    })
    .catch(error => {
      console.log('error retrieving/refreshing tasks', error);
      res.sendStatus(500);
    });
});


// Start listening for requests on a specific port
const PORT = 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});