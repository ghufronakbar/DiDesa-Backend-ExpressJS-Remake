require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const { PORT } = require('./constant');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/ping', require('./routes/internalPing'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user',require('./routes/user'));


app.listen(PORT, () => {
    console.log(`⚡️[server]: Server started on port ${PORT} ⚡`);    
});