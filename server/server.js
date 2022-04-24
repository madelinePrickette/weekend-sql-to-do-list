const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//connection from pool.js
const pool = require('./modules/pool');
const { send } = require('express/lib/response');


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))


app.post('/tasks', (req, res) => {
    console.log('yay im in the post route');
    // This is how we insert something into the database, what is in green can be tested in Postico to check validity
    const query =  `INSERT INTO "tasks" ( "task" ) VALUES ($1);`;
    // I think this is requesting to add to the database as res.send is responding to the client...?
    const values = [req.body.task];
    // Making a query
    pool.query( query, values ).then( (results)=> {
      // Send a status that says CREATED becacause the task was successfully added to the database
      res.sendStatus(201);
      // Handled the error gracefully so it sends an error in the DOM console log instead of blowing up and destroying shit. lol
    }) .catch(error => {
      console.log('there was an error with adding the new task to the database', error);
      res.sendStatus(500);
    })
    //res.send('yay now the post is in the console');
})// End of posting new tasks WORKS!!!!!!!!!!!!

app.get('/tasks', (req, res) => {
    console.log('omg the get route works', req.body);
    //res.send('omg the get route works in the DOM console');
    const queryGetTasks = 'SELECT * FROM "tasks" ORDER BY "id";';
    // This is a query where we are getting information from the database
    pool.query(queryGetTasks).then(result => {
      // This res.send is bringing back the data rows and sending it to the client
    res.send(result.rows);
    })// Incase of problems, we handled it gracefully.
    .catch(error => {
      console.log('error retrieving/refreshing tasks', error);
      // The status of 500 means there is a server end problem...
      res.sendStatus(500);
    });
});// End of get or refreshing tasks, SUCCESSFUL YAY!

app.delete('/tasks/:id',  (req, res) => {
  // I think the :id means the specific id attached to each task, 
  // like it was referred in the client.js.. could be wrong.
  console.log('the server understands the delete button was pushed', req.params.id);
  // I need more clarification on req.params.id plz..
  // DELETE FROM is instructing the databast to delete a specific task in a language it can understand.
  const query = `DELETE FROM "tasks" WHERE "id"=$1;`;
  const values = [req.params.id];
  //sending a query to the database to relay information
  pool.query( query, values ).then((response) => {
    res.sendStatus(200);
    // Handling error gracefully via 500 server code
  }).catch((error) => {
    console.log('there was a problem trying to delete this task from the database', error);
    res.sendStatus(500);
  })
}); // End delete









// Start listening for requests on a specific port
const PORT = 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});