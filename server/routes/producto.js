const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');
const app = express();
const Producto = require('../models/producto');

// =============================
// Obtener productos
// =============================
app.get('/producto', verificaToken, (req, res) => {
    // trae todos los productos
    // populate: usuario, categoria
    // paginado
    let desde = Number(req.query.desde || 0);

    let limite = Number(req.query.limite || 5);

    Producto.find({})
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: true,
                    err
                });
            };
            Producto.count({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    total: conteo,
                    productos
                })
            });
        });

});

// =============================
// Obtener un productos por ID
// =============================
app.get('/producto/:id', verificaToken, (req, res) => {
    // populate: usuario, categoria
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!producto) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                });
            }

            res.json({
                ok: true,
                producto
            })
        });

});

// =============================
// Buscar producto
// =============================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })
        })
});

// =============================
// Crear un nuevo producto
// =============================
app.post('/producto', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let idusuario = req.usuario._id;
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: idusuario
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Ocurrio un error al guardar producto'
                }
            });
        };

        res.json({
            ok: true,
            producto: productoDB
        });

    });


});

// =============================
// Actualizar un producto
// =============================
app.put('/producto/:id', verificaToken, (req, res) => {
    // Actualiza el usuario
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria']);
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!producto) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                })
            }

            res.json({
                ok: true,
                producto
            })
        });



});

// =============================
// Borrar un producto
// =============================
app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let cambiarDisponible = {
        disponible: req.body.disponible
    }

    Producto.findByIdAndUpdate(id, cambiarDisponible, { new: true, runValidators: true })
        .exec((err, productoDescativado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDescativado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                })
            }

            res.json({
                ok: true,
                producto: {
                    message: 'Producto eliminado correctamente'
                }
            })
        });



});



module.exports = app;