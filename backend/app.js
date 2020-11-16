const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
app.use (bodyParser.json());
const mongoose = require ('mongoose');
const livroRoutes = require ('./rotas/livros');




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


app.use('/api/livros',livroRoutes);


module.exports = app;


/*
app.use((req, res, next) => {
  console.log ("Chegou um requisição...");
  next();
});*/

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



