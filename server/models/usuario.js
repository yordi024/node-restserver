const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let roleValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria']
    },
    img: {
        type: String,
        required: false
    }, // No es obligatoria
    role: {
        type: String,
        required: [true, 'Rol del usuario es obligatorio'],
        default: 'USER_ROLE',
        enum: roleValidos
    }, // default: 'USER_ROLE
    estado: {
        type: Boolean,
        required: true,
        default: true
    }, // Boolean
    google: {
        type: Boolean,
        default: false
    } // Boolean
});

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;

}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de se unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);