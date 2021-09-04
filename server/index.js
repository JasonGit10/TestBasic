const path = require('path');
const express = require("express");
const { json, urlencoded } = express;
const cors = require('cors');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/public')));

// Configuración global de rutas
app.use(require('./routes/index'));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});