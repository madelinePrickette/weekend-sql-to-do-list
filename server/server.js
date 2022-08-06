const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended : true}));
const tasksRouter = require('./routes/task.router')

// ROUTES
app.use('/tasks', tasksRouter);

app.use(express.static('server/public'))

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening...', PORT);
});