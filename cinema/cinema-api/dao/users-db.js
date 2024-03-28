const { MongoClient, ObjectId } = require('mongodb');
//parâmetros de conexão
const url="mongodb://127.0.0.1:27017";
const dbname="cinema";
const collection="users";
var conexao;//controla o estado da conexão

async function conectar(){
    if(conexao) return conexao;
    try{
        const client = new MongoClient(url);
        await client.connect();
        conexao = client.db(dbname);
        return conexao;
    }catch(erro){
        console.log(erro);
    }
}

async function logar(login, senhaCrypto){
    try{
        const db = await conectar();
        return await db.collection(collection).findOne({$and: [{login : login, senha : senhaCrypto}]});
    }catch(erro){
        throw new Error(erro);
    }
}



module.exports = { logar }