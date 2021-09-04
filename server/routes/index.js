const express = require('express');
const app = express();

app.use( require('./mercadolibreApi'));

module.exports = app;