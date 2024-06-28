import mongoose from "mongoose"

export default async function connectdb(){
    const MONGO_URI = "mongodb+srv://root:root@testebug.ufokiw9.mongodb.net/?retryWrites=true&w=majority&appName=testebug"
    try{
        mongoose.connect(MONGO_URI)
        console.log("Banco conectado!")
    }catch(error){
        console.log("Erro ao conectar o banco!", error.message)
    }
}
