const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended : true}));

// ROUTES


// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening...', PORT);
});