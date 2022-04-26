const esAdminRole = (req,res,next)=>{
const {usuario} = req

if(!usuario){
    res.status(500).json({msg:"Token no verificado"})
}

const {rol} = usuario

if(rol!=="ADMIN_ROLE"){
    return res.status(401).json({msg:"No tiene acceso de administrador"})
}

next();

}

module.exports = esAdminRole;