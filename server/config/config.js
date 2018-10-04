// =========================
// Pueto
// =========================

process.env.PORT = process.env.PORT || 3000;

// =========================
// Entorne
// =========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// Base de datos
// ========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb://<cafe-user>:124578963Rr@ds223653.mlab.com:23653/cafe';
}

process.env.URL_DB = urlDB;