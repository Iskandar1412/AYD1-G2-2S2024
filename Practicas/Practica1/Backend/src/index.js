// npm init -y
// npm install express cors axios morgan
// npm i --save nodemon
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Settings
const app = express();
const PORT = 9200;

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use(require('./routes/task.routes'));

// Listen
app.listen(PORT, () => {
    console.log(`Node APP listening on ${PORT}`);
});