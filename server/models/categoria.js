const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: [true, 'Usuario es obligatoria'],
        ref: 'Usuario'
    }
});

// categoriaSchema.methods.toJSON = function() {

//     let categoria = this;
//     let userObject = categoria.toObject();
//     delete userObject.usuario;
//     return userObject;

// }

// categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe de se unico' });

module.exports = mongoose.model('Categoria', categoriaSchema)