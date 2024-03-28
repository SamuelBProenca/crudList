const { MongoClient, ObjectId } = require('mongodb');
//parâmetros de conexão
const url="mongodb://127.0.0.1:27017";
const dbname="cinema";
const collection="filmes_series";
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

async function listar(){
    try{
        const db = await conectar();
        return await db.collection(collection).find().collation({'locale':'en'}).sort('titulo').toArray();
    }catch(erro){
        throw new Error(erro);
    }
}

async function adicionar(registro){
    try{
        const db = await conectar();
        //collection amarelo é a função e colleciton azul é a const criada na linha 5
        return await db.collection(collection).insertOne(registro);
    }catch(erro){
        throw new Error(erro);
    }
}

//remove um filme/série pelo id enviado da rota que foi recebido na requisição
async function remover(id){
    try{
        const db = await conectar();
        const result = await db.collection(collection).deleteOne({_id: new ObjectId(id)});
        return result.deletedCount > 0 ? true : false;
    }catch(erro){
        throw new Error(erro);
    }
}

//buscar filme e série por id
async function buscarPorId(id){
    try{
        const db = await conectar();
        return await db.collection(collection).findOne({ _id : new ObjectId (id)});
    }catch(erro){
        throw new Error(erro);
    }
}

// gravar a edição de um filme/serie
async function editar(id, registro){
     
    try{
        const db = await conectar();
        const result = await db.collection(collection).updateOne({_id : new ObjectId (id)}, {$set: registro});
        return result.modifiedCount > 0 ? true : false;
    }catch(erro){
        throw new Error(erro);
    }
}

module.exports = { listar, adicionar, remover, buscarPorId, editar }