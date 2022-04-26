const jwt = require("jsonwebtoken")
const User = require("../models/users")

const ValidarJWT = async (req,res,next)=>{

const token = req.header("x-token");
console.log(token)

if(!token){
    return res.status(401).json({msg:"No hay token"})
}

try {

    const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
    
    const usuario = await User.findById(uid)

    if(!usuario){
        return res.status(401).json({msg:"Usuario inexistente"})
    }

    req.usuario = usuario
    
} catch (error) {
    console.log(error)
    res.status(401).json({msg:"Token invalido"})
}


next();


}

module.exports = ValidarJWT;