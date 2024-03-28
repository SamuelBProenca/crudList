var express = require('express');
var router = express.Router();
const db = require("../dao/cinema-db");

function validaToken(req,res,next){
  const header = req.headers['authorization'];
  if(typeof header != undefined){
    const token = header.split(' ')[1];
    if(req.session.token == token)
      next();
    else
      res.status(403).json({message: 'Acesso negado!'});
  }else{
    res.status(401).json({message: 'Não altorizado'});
  }
}

//rota para listar filmes e séries cadastrados
router.get('/listar', validaToken, async(req,res) => {
  try{
    const registros = await db.listar();
    res.status(200).json(registros);
  }catch(erro){
    console.log(erro);
    res.status(500).json({message: "Erro ao listar os filmes/séries. Tente novamente ou contate o administrador."});
  }
});

//rota para adicionar novo filme/série
router.post('/adicionar', async(req,res)=>{
  //recebemos os dados do corpo da requisição
  const registro={
    titulo: req.body.titulo,
    ano: parseInt(req.body.ano)
  };
  const anoAtual = new Date().getFullYear();
  if(registro.titulo !== undefined && registro.titulo && registro.ano !== undefined && !isNaN(registro.ano) && (registro.ano >= 1900 && registro.ano <= anoAtual)){
    try{
       await db.adicionar(registro);
       res.status(200).json({message: "Registro adicionado com sucesso."});
    }catch(erro){//captura o erro lançado pelo throw
      console.log(erro);
      res.status(500).json({message: "Erro ao adicionar o registro. Tente novamente."});
    }
  }else{
    res.status(400).json({message: "400 - Bad request. Dados incorretos enviados pela requisição. Verifique e tente novamente."});
  }
});

// Rota para remover o cartão através do id recebido (_id)
router.delete('/remover/:id', async(req,res)=>{
  const id = req.params.id;
  try{
    //Não se faz necessário o uso de chaves {} quando o if else tem apenas uma linha como exemplificado a baixo
    if(await db.remover(id))
      res.status(200).json({message : "Registro removido com sucesso."});
    else
      res.status(200).json({message : "Registro não encontrado para remoção."});
    
  }catch(erro){
    console.log(erro);
    res.status(500).json({message : "Erro ao remover registro solicitado."})
  }

});

// Rota para buscar filme_serie para edição
router.get('/editar/:id', async(req,res)=>{

  const id = req.params.id;

  try{
    const registro = await db.buscarPorId(id);
    res.status(200).json(registro);
  }catch(erro){
    console.log(erro);
    res.status(500).json({ message : "Ero na busca do registro solicitado."});
  }

});

//rota para processar a edição do filme/serie

router.put('/editar/:id', async(req,res)=>{
  //id od registro que será alterado
  const id = req.params.id;

  //dados do registro que serão alterados
  const registro = {
    titulo : req.body.titulo,
    ano : parseInt(req.body.ano)
  };
  
  const anoAtual = new Date().getFullYear();
  if(registro.titulo !== undefined && registro.titulo && registro.ano !== undefined && !isNaN(registro.ano) && (registro.ano >= 1900 && registro.ano <= anoAtual)){
    try{
      if(await db.editar(id, registro))
        res.status(200).json({message : "Registro alterado com sucesso."});
      else
        res.status(200).json({message : "Alteração não realizada."});
    }catch(erro){
      console.log(erro);
      res.status(500).json({message : "Erro ao editar registro"});
    }
  }else{
    res.status(400).json({message : "400 - Bad Request. Dados incorretos enviados na requisição"});
  }

});

//nunca apagar essa linha!
module.exports = router;
