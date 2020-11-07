const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
app.use (bodyParser.json());
const Livro = require ('./models/livro');
const mongoose = require ('mongoose');


/*
app.use((req, res, next) => {
  console.log ("Chegou um requisição...");
  next();
});*/

mongoose.connect('mongodb+srv://fatec_ipi:4houmedekimassu@marcelo.ekoio.mongodb.net/fatec_ipi?retryWrites=true&w=majority')
.then(() => console.log ("Conexão Ok"))
.catch((e) => console.log ("Conexão falhou:" + e))



//CORS: Cross Origin Resource Sharing

app.use ((req,res,next) => {
  res.setHeader ('Access-Control-Allow-Origin','*');
  res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE, OPTIONS');
  next();
});

/*
app.post ('/api/livros', (req, res, next) => {
  const livro = new Livro({
  titulo: req.body.titulo,
  id: req.body.id,
  autor: req.body.autor,
  paginas:req.body.paginas
  })
  console.log (livro);
  res.status(201).json({mensagem: 'Livro inserido'})
  });
*/
/*
app.post('/api/livros',(req, res, next) => {
  const livro = req.body;
  livros.push(livro);
  console.log(livro);
  res.status(201).json({
    mensagem: 'Livro inserido'
  })
});


app.use ('/api/livros',(req,res,next) => {
  res.status(200).json({
    mensagem:"Tudo Ok",
    livros: livros
  })
});*/

app.post('/api/livros', (req, res, next) => {
  const livro = new Livro ({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas,
    id: req.body.id

  });
  livro.save()
  .then((livroInserido) =>{
    console.log(`Inserção ok: ${livroInserido}`);
    res.status(201).json({
      mensagem:'Livro Inserido',
      id: livroInserido._id
    })
  })
  .catch((error) =>{
    console.log(`Inserção Falhou: ${error}`);
    res.status(404).json({
      mensagem: 'Livro não foi inserido'
    })
  })
});



app.get ('/api/livros',(req, res, next) => {
  Livro.find()
  .then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: 'Tudo ok',
      livros: documents
    })
  })
  .catch((error) => {
    console.log ('Busca falhou:'+ error)
    res.status(404).json({
      mensagem: 'Falhou',
      livros: []
    })
  })
});

app.get('/api/livros/:id', (req, res, next) =>{
  Livro.findById(req.params.id).then( liv => {
    if(liv)
      res.status(200).json(liv)
    else
      res.status(404).json({mensagem: "Livro não encontrado!"})
  })
})

//DELETE /api/livros/5f998a124381ae1ee15f8299
app.delete ('/api/livros/:id' , (req, res, next) => {
  Livro.deleteOne({_id: req.params.id})
  .then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Livro removido"});
  })
 // console.log(req.params);
  res.status(200).end();
});

app.put ('/api/livros/:idLivro' , (req,res, next) => {
  const livro = new Livro ({
    _id: req.params.idLivro,
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas
  });
  Livro.updateOne(
    {_id: req.params.idLivro},
    livro
  ).then(resultado =>{
    console.log("Atualizou:" + JSON.stringify(resultado))
    res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
  })
})

module.exports = app;
