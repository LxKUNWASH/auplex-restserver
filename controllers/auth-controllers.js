const User = require("../models/users")
const generarJWT = require("../helpers/generar-jwt")
const login = async (req,res)=>{

const {correo} = req.body
try {

    const usuario = await User.findOne({correo})

    const token = await generarJWT(usuario.id)

    res.json({msg:"Sesion iniciada", usuario,token})  
    
} catch (error) {
    console.log(error)
    return res.status(500).json("Error de servidor")
}
  
    
    }
    
    module.exports = {
        login
    }