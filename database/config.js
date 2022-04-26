const mongoose = require ("mongoose")

const dbConnection = async ()=>{

try {
    
    await mongoose.connect(process.env.MONGOPW,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    console.log("base de datos online")

} catch (error) {
    console.log(error)    
}


}

module.exports = {
    dbConnection
}