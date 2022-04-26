const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const validarExtension = require('../helpers/validarExtension');
const User = require("../models/users")

const actualizarImagenCloudinary = async (req, res) => {
    const { id } = req.params;
    try {
    
        const usuario = await User.findById(id);
        if (!usuario) {
          return res
            .status(400)
            .json({ msg: `La id:${id} no es valida` });
        }
      
  
    if(usuario.img){
      const imagenArr = usuario.img.split("/")
      const nombreImagen = imagenArr[imagenArr.length-1]
      const [public_id] = nombreImagen.split(".")
      cloudinary.uploader.destroy(public_id)
    }
  
    const {name,tempFilePath} = req.files.documento
    
    await validarExtension(name)

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
  
    usuario.img = secure_url;
  
    await usuario.save();
    res.status(200).json({msg:"Imagen Cargada con exito",usuario});
    } 
    
    catch (msg) {
      console.log(msg)
      res.status(400).json({msg})
    }
  };
  


module.exports = {
    actualizarImagenCloudinary
}