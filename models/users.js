const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    nombre:{
        type: String,
        required : (true,"El nombre es obligatrorio")
    },
    correo:{
        type: String,
        required : (true,"El correo es obligatrorio"),
        unique: true
    },
    contraseña:{
        type: String,
        required : (true,"La contraseña es obligatroria")
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required : (true,"El rol es obligatrorio"),
        emun:("ADMIN_ROLE","USER_ROLE")
    }
});

UserSchema.methods.toJSON = function (){
    const {__v,contraseña,_id,...usuario} = this.toObject()
    usuario.uid = _id
    return usuario;
}

module.exports = model("User",UserSchema)