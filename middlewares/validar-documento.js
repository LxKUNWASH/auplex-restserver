
const existeDocumento = (req,res,next)=>{

 if (!req.files || Object.keys(req.files).length === 0 || !req.files.documento) {
        return res.status(400).json({ msg: "no hay documentos que subir" });
    }

    next();

}

module.exports = existeDocumento