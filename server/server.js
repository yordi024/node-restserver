require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Habilitar la capreta public
app.use(express.static(path.resolve(__dirname, '../public')));


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