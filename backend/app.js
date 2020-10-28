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
const livros = [
  {
    titulo: 'The Maze Runner',
    id: 'E-0001',
    autor: 'James Dashner',
    paginas: '372'
  },
  {
    titulo: 'The Scorsh Trials',
    id: 'E-0002',
    autor: 'James Dashner',
    paginas: '360'
  },
  {
    titulo: 'The Kill Order',
    id: 'E-0003',
    autor: 'James Dashner',
    paginas: '325'
  }
]

//CORS: Cross Origin Resource Sharing

app.use ((req,res,next) => {
  res.setHeader ('Access-Control-Allow-Origin','*');
  res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});


app.post('/api/livros', (req, res, next) => {
  const livro = new Livro ({
    titulo: req.body.titulo,
    id: req.body.id,
    autor: req.body.autor,
    paginas: req.body.paginas
  });
  livro.save()
  .then((document) =>{
    console.log(`Inserção ok: ${document}`);
    res.status(201).json({
      mensagem:'Livro Inserido'
    })
  })
  .catch((error) =>{
    console.log(`Inserção Falhou: ${error}`);
    res.status(404).json({
      mensagem: 'Livro não foi inserido'
    })
  })
});

/*
app.post('/api/livros', (req, res, next) => {
  const livro = req.body;
  livros.push(livro);
  console.log(livro);
  res.status(201).json({
    mensagem:'Livro Inserido'
  });
});*/


app.get ('/api/livros',(req, res, next) => {
  Livro.find()
  .then(documents => {
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

module.exports = app;
