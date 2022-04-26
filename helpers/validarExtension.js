const validarExtension = (nombre,extensionesPermitidas=["jpg","png","jpeg"])=>{

return new Promise ((resolve,reject)=>{


const nombreCortado = nombre.split(".")
const extension = nombreCortado[nombreCortado.length-1]

if(extensionesPermitidas.includes(extension)){
resolve(extension)
}

reject(`La extension ${extension} no es permitida, permitidas: ${extensionesPermitidas}`)

})

}

module.exports = validarExtension