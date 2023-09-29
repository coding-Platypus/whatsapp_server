require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
//require('./www/rest/server').startServer(app);
var dir = path.join(__dirname, 'uploads');
app.use(express.static(dir));

require('./src/routes/route').setRouter(app);
require('./database/connection').connection(app);