const express = require('express');
const bodyParser = require('body-parser')
const route = require("./routes/route.js");
const app = express();

// parse data into json format
app.use(bodyParser.json());

// DB connections
require('./database/connection')

// routes
app.use('/', route)

//port
app.listen(3000, () => console.log(`Server is listening on port 3000`));