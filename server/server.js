const express = require('express');
const bodyParser = require('body-parser');
const pool = require('pool');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))


app.post('/tasks', (req, res) => {
    console.log('yay');
    //res.send('yay now the post is in the console');
})

app.get('/tasks', (req, res) => {
    console.log('omg the get route works');
    //res.send('omg the get route works in the DOM console');
    let queryGetTasks = 'SELECT * FROM "tasks" ORDER BY "id";';
    
})









// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});