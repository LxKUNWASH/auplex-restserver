
const express = require("express");
const fileUpload = require("express-fileupload")
const cors = require('cors')
const {dbConnection} = require("../database/config")


class Server {

  constructor() {
    //App de express
    this.app = express();
    //Variable de entorno
    this.port = process.env.PORT;
    //Rutas ubicacion
    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/usuarios",
      documentos:"/api/uploads"
    } 
    //Coneccion a base de datos 
    this.connectDb()
    //Middlewares
    this.middlewares()
    //Rutas de aplicacion
    this.routes()
    
    
  }

  middlewares () { 
    //CORS
    this.app.use(cors())
    //Lectura de parseo de Body
    this.app.use(express.json())
    // Directorio Publico
    this.app.use(express.static("public"))
    //Cargar Archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true
  }))
}

  routes () {
    this.app.use(this.paths.auth,require("../routes/auth-route"))
    this.app.use(this.paths.documentos,require("../routes/upload-route"))
    this.app.use(this.paths.usuarios,require("../routes/user-route"))
  }

  async connectDb () {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port} `);
    });
  }

  
}

module.exports = Server;