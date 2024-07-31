require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const { PORT } = require('./constant');
const app = express();


//parse application json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// ROUTES
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user',require('./routes/user'));


app.listen(PORT, () => {
    console.log(`⚡️[server]: Server started on port ${PORT} ⚡`);    
});