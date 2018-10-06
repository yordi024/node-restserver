require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Configuracion global de las rutas
app.use(require('./routes/index'));

// Conexion con db de mongo
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.URL_DB, {
    useCreateIndex: true,
    useNewUrlParser: true
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})